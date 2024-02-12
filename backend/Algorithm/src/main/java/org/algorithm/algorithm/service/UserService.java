package org.algorithm.algorithm.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.mail.MessagingException;
import jakarta.mail.SendFailedException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.dto.EmailVerifyDTO;
import org.algorithm.algorithm.dto.UserDTO;
import org.algorithm.algorithm.entity.EmailVerifyEntity;
import org.algorithm.algorithm.entity.UserEntity;
import org.algorithm.algorithm.entity.UserLinkEntity;
import org.algorithm.algorithm.entity.UserProfileEntity;
import org.algorithm.algorithm.exception.EmailException;
import org.algorithm.algorithm.exception.NicknameException;
import org.algorithm.algorithm.exception.SQLException;
import org.algorithm.algorithm.repository.EmailVerifyRepository;
import org.algorithm.algorithm.repository.UserLinkRepository;
import org.algorithm.algorithm.repository.UserProfileRepository;
import org.algorithm.algorithm.repository.UserRepository;
import org.algorithm.algorithm.util.Const;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.beans.PropertyDescriptor;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

import static org.algorithm.algorithm.util.Const.EMAILSENDER;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository; // 먼저 jpa, mysql dependency 추가
    private final UserProfileRepository userProfileRepository;
    private final UserLinkRepository userLinkRepository;
    private final EmailVerifyRepository emailVerifyRepository; // 먼저 jpa, mysql dependency 추가
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender javaMailSender;


    public void save(UserDTO userDTO) {
        try {

            if (userRepository.findByNickname(userDTO.getNickname()) != null) {
                throw new NicknameException("Duplicated Nickname ! ");
            }

            if (userRepository.findByEmail(userDTO.getEmail()) != null) {
                throw new EmailException("Duplicated Email ! ");
            }

            // repsitory의 save 메서드 호출
            UserEntity userEntity = UserEntity.toUserEntity(userDTO);
            userRepository.save(userEntity);
            //Repository의 save메서드 호출 (조건. entity객체를 넘겨줘야 함)
        } catch(Error e){
            throw new SQLException("POST USER ERROR ! ");
        }

    }

    public UserDTO userLogin(UserDTO userDTO) {
        try {
            // 이메일과 비밀번호를 사용하여 DB에서 사용자를 찾아냅니다.
            UserEntity userEntity = userRepository.findByEmail(userDTO.getEmail());

            // 사용자를 찾지 못하면 null 반환
            // 유저가 없음
            if (userEntity == null) {
                return null;
            }

            if (passwordEncoder.matches(userDTO.getUserPw(), userEntity.getUserPw())) {
                // UserEntity를 UserDTO로 변환하여 반환
                return UserDTO.toSessionDTO(userEntity);
            } else {
                return null;
            }
        }
        catch(Error e){
            throw new SQLException("User Login SQL Error ! ");
        }
    }

    public ObjectNode userSelf(UserDTO userDTO){
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();

        // 0 tried, 1 solved
        UserEntity userEntity = userRepository.findByUserId(userDTO.getUserId());
        String[] resultValue = userRepository.findSolvedByUserId((int) userDTO.getUserId()).split(",");
        UserProfileEntity userProfileEntity = userProfileRepository.findUserProfileEntityByUserId(userDTO.getUserId());
        String profile;

        if (userProfileEntity == null) {
            profile = null;
        } else {
            profile = userProfileEntity.getPath();
        }

        response.put("userId",userEntity.getUserId());
        response.put("email",userEntity.getEmail());
        response.put("nickname",userEntity.getNickname());
        response.put("anno_nofi",userEntity.getAnnoNofi());
        response.put("post_nofi",userEntity.getPostNofi());
        response.put("comment_nofi",userEntity.getCommentNofi());
        response.put("like_nofi",userEntity.getLikeNofi());
        response.put("answer_nofi",userEntity.getAnswerNofi());
        response.put("event_nofi",userEntity.getEventNofi());
        response.put("profile",profile);
        response.put("tried",resultValue[0]);
        response.put("solved",resultValue[1]);
        response.put("createdTime", String.valueOf(userEntity.getCreatedTime()));

        return response;
    }


    public ObjectNode userNotification(UserDTO userDTO) {
        String[] resultValue = userRepository.findNotificationByUserId((int) userDTO.getUserId()).split(",");
        Boolean[] booleanValue= new Boolean[resultValue.length];

        for (int i = 0; i < resultValue.length; i++) {
            booleanValue[i] = Boolean.parseBoolean(resultValue[i]);
        }
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode resultObject = objectMapper.createObjectNode();

        for (int i = 0; i < Const.NOIFS.size(); i++) {
            String column = Const.NOIFS.get(i);
            Boolean value = booleanValue[i]; // 이 부분은 실제 코드에 맞게 수정 필요

            resultObject.put(column, value != null && value);
        }

        return resultObject;
    }

    public ObjectNode userLinks(String userId){
        try {
            String[] resultValue = userRepository.findLinksByUserId(userId);

            // ObjectMapper를 사용하여 JSON 배열 생성
            ObjectMapper objectMapper = new ObjectMapper();
            ArrayNode linksArrayNode = objectMapper.createArrayNode();

            for (String linkString : resultValue) {
                String[] linkParts = linkString.split(",");
                if (linkParts.length == 4) {
                    ObjectNode linkNode = objectMapper.createObjectNode();
                    linkNode.put("linkId", Integer.parseInt(linkParts[0]));
                    linkNode.put("linkKind", linkParts[1]);
                    linkNode.put("domain", linkParts[2]);
                    linkNode.put("createdTime", linkParts[3]);
                    linksArrayNode.add(linkNode);
                }
            }


            ObjectNode responseNode = objectMapper.createObjectNode();
            responseNode.set("links", linksArrayNode);
            System.out.println(responseNode);
            return responseNode;
        } catch (Error e){
            throw new SQLException("GET user_link SQL ERROR !");
        }

    }

    public ObjectNode userMypageSolved(UserDTO userDTO) {
        String[] resultValue = userRepository.findSolvedByUserId((int) userDTO.getUserId()).split(",");

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode resultObject = objectMapper.createObjectNode();

        for (int i = 0; i < resultValue.length; i++) {
            String column = Const.SOLVED.get(i);
            String value = resultValue[i];

            resultObject.put(column, value);
        }

        return resultObject;
    }

    public ObjectNode userMypageQuestion(UserDTO userDTO) {
        try {
            String[] resultValue = userRepository.findQuestionByUserId((int) userDTO.getUserId());


            ObjectMapper objectMapper = new ObjectMapper();
            ArrayNode linksArrayNode = objectMapper.createArrayNode();


            for (String linkString : resultValue) {
                String[] linkParts = linkString.split(",");
                String tempId = null;
                if (linkParts.length == Const.BOARD.size()) {
                    ObjectNode linkNode = objectMapper.createObjectNode();
                    for (int i = 0; i < Const.BOARD.size(); i++) {
                        String column = Const.BOARD.get(i);
                        String value = linkParts[i];
                        if (Objects.equals(column, "board_id")) {
                            tempId = linkParts[i];
                        }
                        linkNode.put(column, value);
                    }
                    linkNode.put("recommend", userRepository.findRecommendByBoardId(tempId));
                    linksArrayNode.add(linkNode);
                }
            }
            ObjectNode responseNode = objectMapper.createObjectNode();
            responseNode.set("userId", objectMapper.convertValue(userDTO.getUserId(), JsonNode.class));
            responseNode.set("results", linksArrayNode);
            responseNode.set("totals", objectMapper.convertValue(resultValue.length, JsonNode.class));
            System.out.println(responseNode);

            return responseNode;
        }
        catch(Error e) {
            throw new SQLException("GET MyPage Question Error ! ");
        }
    }
    public ObjectNode userMypageFeedback(UserDTO userDTO) {
        try {
            String[] resultValue = userRepository.findFeedbackByUserId((int) userDTO.getUserId());


            ObjectMapper objectMapper = new ObjectMapper();
            ArrayNode linksArrayNode = objectMapper.createArrayNode();


            for (String linkString : resultValue) {
                String[] linkParts = linkString.split(",");
                String tempId = null;
                if (linkParts.length == Const.BOARD.size()) {
                    ObjectNode linkNode = objectMapper.createObjectNode();
                    for (int i = 0; i < Const.BOARD.size(); i++) {
                        String column = Const.BOARD.get(i);
                        String value = linkParts[i];
                        if (Objects.equals(column, "board_id")) {
                            tempId = linkParts[i];
                        }
                        linkNode.put(column, value);
                    }
                    linkNode.put("recommend", userRepository.findRecommendByBoardId(tempId));
                    linksArrayNode.add(linkNode);
                }
            }
            ObjectNode responseNode = objectMapper.createObjectNode();
            responseNode.set("userId", objectMapper.convertValue(userDTO.getUserId(), JsonNode.class));
            responseNode.set("results", linksArrayNode);
            responseNode.set("totals", objectMapper.convertValue(resultValue.length, JsonNode.class));
            System.out.println(responseNode);

            return responseNode;
        }
        catch(Error e){
            throw new SQLException("GET MyPage Feedback Error ! ");
        }
    }

    public ObjectNode userMypageFree(UserDTO userDTO) {
        try {

            String[] resultValue = userRepository.findFreeByUserId((int) userDTO.getUserId());


            ObjectMapper objectMapper = new ObjectMapper();
            ArrayNode linksArrayNode = objectMapper.createArrayNode();


            for (String linkString : resultValue) {
                String[] linkParts = linkString.split(",");
                String tempId = null;
                if (linkParts.length == Const.BOARD.size()) {
                    ObjectNode linkNode = objectMapper.createObjectNode();
                    for (int i = 0; i < Const.BOARD.size(); i++) {
                        String column = Const.BOARD.get(i);
                        String value = linkParts[i];
                        if (Objects.equals(column, "solved")) continue;
                        if (Objects.equals(column, "board_id")) {
                            tempId = linkParts[i];
                        }
                        linkNode.put(column, value);
                    }
                    linkNode.put("recommend", userRepository.findRecommendByBoardId(tempId));
                    linksArrayNode.add(linkNode);
                }
            }
            ObjectNode responseNode = objectMapper.createObjectNode();
            responseNode.set("userId", objectMapper.convertValue(userDTO.getUserId(), JsonNode.class));
            responseNode.set("results", linksArrayNode);
            responseNode.set("totals", objectMapper.convertValue(resultValue.length, JsonNode.class));
            System.out.println(responseNode);

            return responseNode;
        }
        catch(Error e){
            throw new SQLException("GET MyPage FreeBoard Error ! ");
        }
    }

    public ObjectNode userMypageAnswer(UserDTO userDTO) {
        try {
            String[] resultValue = userRepository.findAnswerByUserId((int) userDTO.getUserId());


            ObjectMapper objectMapper = new ObjectMapper();
            ArrayNode linksArrayNode = objectMapper.createArrayNode();


            for (String linkString : resultValue) {
                String[] linkParts = linkString.split(",");
                System.out.println(linkString);
                String tempId = null;
                if (linkParts.length == Const.MYPAGEANSWER.size()) {
                    ObjectNode linkNode = objectMapper.createObjectNode();
                    for (int i = 0; i < Const.MYPAGEANSWER.size(); i++) {
                        String column = Const.MYPAGEANSWER.get(i);
                        String value = linkParts[i];
                        if (Objects.equals(column, "board_id")) {
                            tempId = linkParts[i];
                        }
                        linkNode.put(column, value);
                    }
                    linkNode.put("recommend", userRepository.findRecommendByBoardId(tempId));
                    linksArrayNode.add(linkNode);
                }
            }
            ObjectNode responseNode = objectMapper.createObjectNode();
            responseNode.set("userId", objectMapper.convertValue(userDTO.getUserId(), JsonNode.class));
            responseNode.set("results", linksArrayNode);
            responseNode.set("totals", objectMapper.convertValue(resultValue.length, JsonNode.class));
            System.out.println(responseNode);

            return responseNode;
        }
        catch(Error e){
            throw new SQLException("GET MyPage Answer Error ! ");
        }
    }

    public ObjectNode userMypageComment(UserDTO userDTO) {
        try {
            String[] resultValue = userRepository.findCommentByUserId((int) userDTO.getUserId());


            ObjectMapper objectMapper = new ObjectMapper();
            ArrayNode linksArrayNode = objectMapper.createArrayNode();


            for (String linkString : resultValue) {
                String[] linkParts = linkString.split(",");
                System.out.println(linkString);
                String tempId = null;
                if (linkParts.length == Const.MYPAGECOMMENT.size()) {
                    ObjectNode linkNode = objectMapper.createObjectNode();
                    for (int i = 0; i < Const.MYPAGECOMMENT.size(); i++) {
                        String column = Const.MYPAGECOMMENT.get(i);
                        String value = linkParts[i];
                        if (Objects.equals(column, "board_id")) {
                            tempId = linkParts[i];
                        }
                        linkNode.put(column, value);
                    }
                    linkNode.put("recommend", userRepository.findRecommendByBoardId(tempId));
                    linksArrayNode.add(linkNode);
                }
            }
            ObjectNode responseNode = objectMapper.createObjectNode();
            responseNode.set("userId", objectMapper.convertValue(userDTO.getUserId(), JsonNode.class));
            responseNode.set("results", linksArrayNode);
            responseNode.set("totals", objectMapper.convertValue(resultValue.length, JsonNode.class));
            System.out.println(responseNode);

            return responseNode;
        }
        catch(Error e){
            throw new SQLException("GET MyPage Comment Error ! " );
        }
    }

    public ObjectNode userMypageFavorite(UserDTO userDTO) {
        try {
            String[] resultValue = userRepository.findFavoriteBoardByUserId((int) userDTO.getUserId());


            ObjectMapper objectMapper = new ObjectMapper();
            ArrayNode linksArrayNode = objectMapper.createArrayNode();


            for (String linkString : resultValue) {
                String[] linkParts = linkString.split(",");
                System.out.println(linkString);
                String tempId = null;
                if (linkParts.length == Const.MYPAGEFAVORITE.size()) {
                    ObjectNode linkNode = objectMapper.createObjectNode();
                    for (int i = 0; i < Const.MYPAGEFAVORITE.size(); i++) {
                        String column = Const.MYPAGEFAVORITE.get(i);
                        String value = linkParts[i];
                        if (Objects.equals(column, "board_id")) {
                            tempId = linkParts[i];
                        }
                        linkNode.put(column, value);
                    }
                    linkNode.put("recommend", userRepository.findRecommendByBoardId(tempId));
                    linksArrayNode.add(linkNode);
                }
            }
            ObjectNode responseNode = objectMapper.createObjectNode();
            responseNode.set("userId", objectMapper.convertValue(userDTO.getUserId(), JsonNode.class));
            responseNode.set("results", linksArrayNode);
            responseNode.set("totals", objectMapper.convertValue(resultValue.length, JsonNode.class));
            System.out.println(responseNode);

            return responseNode;
        }
        catch(Error e ){
            throw new SQLException("GET MyPage Favorite Error !");
        }
    }

    public ObjectNode userLinkPost(int userId, UserLinkEntity userLinkEntity) {
        try {

            userLinkEntity.setUserId(userId);
            userLinkEntity.setCreatedTime(LocalDateTime.now());

            UserLinkEntity savedEntity = userLinkRepository.save(userLinkEntity);


            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode responseNode = objectMapper.createObjectNode();
            responseNode.put("linkId", savedEntity.getLinkId());
            responseNode.put("userId", savedEntity.getUserId());
            responseNode.put("linkKind", savedEntity.getLinkKind());
            responseNode.put("domain", savedEntity.getDomain());
            responseNode.put("createdTime", String.valueOf(savedEntity.getCreatedTime()));
            return responseNode;
        }
        catch(Error e ){
            throw new SQLException("User Link Post SQL Error ! ");
        }
    }


    public String sendEmail(EmailVerifyDTO emailVerifyDTO) throws MessagingException {
        if(userRepository.findByEmail(emailVerifyDTO.getEmail()) != null){
            throw new EmailException("Already exist email address : " + emailVerifyDTO.getEmail());
        }
        try {
            String verifyCode = RandomStringUtils.random(6, 33, 125, true, true);
            MimeMessage message = javaMailSender.createMimeMessage();
            // email, cdoe , expire
            message.setFrom(EMAILSENDER);
            message.setRecipients(MimeMessage.RecipientType.TO, emailVerifyDTO.getEmail());
            message.setSubject("이메일 인증");
            String body = "";
            body += "<h3>" + "요청하신 인증 번호입니다." + "</h3>";
            body += "<h1>" + verifyCode + "</h1>";
            body += "<h3>" + "감사합니다." + "</h3>";
            message.setText(body, "UTF-8", "html");

            javaMailSender.send(message);

            LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(5);

            EmailVerifyEntity emailVerifyEntity = new EmailVerifyEntity(verifyCode, emailVerifyDTO.getEmail(), expirationTime);

            Optional<EmailVerifyEntity> existingEntity = Optional.ofNullable(emailVerifyRepository.findByEmail(emailVerifyEntity.getEmail()));
            // 기존 아이템이 존재하면 삭제
            existingEntity.ifPresent(emailVerifyRepository::delete);
            emailVerifyRepository.save(emailVerifyEntity);

            return verifyCode;
        }
        catch(Error e){
            throw new SendFailedException("Verify Code Send Failed");
        }
    }

    public ResponseEntity<String> compareCode(EmailVerifyDTO emailVerifyDTO) throws MessagingException {
        try {
            EmailVerifyEntity emailVerifyEntity = emailVerifyRepository.findByEmail(emailVerifyDTO.getEmail());

            LocalDateTime currentTime = LocalDateTime.now();
            long minutesDifference = ChronoUnit.MINUTES.between(currentTime, emailVerifyEntity.getExpirationTime());
            if (minutesDifference < 0)
                return ResponseEntity.status(HttpStatus.REQUEST_TIMEOUT).body("Code Time Expire !");

            if (emailVerifyEntity.getVerifyCode().equals(emailVerifyDTO.getVerifyCode()))
                return ResponseEntity.status(HttpStatus.OK).body("Code Equals !");
            else
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Code Not Equals !");
        }
        catch(Error e){
            throw new SQLException("Compare VerifyCode Error ! ");
        }

    }

    public ObjectNode userUpdate(UserDTO userDTO, int userId) throws MessagingException {
        try {

            if (userRepository.findByNickname(userDTO.getNickname()) != null) {
                throw new NicknameException("Duplicated Nickname ! ");
            }

            if (userRepository.findByEmail(userDTO.getEmail()) != null) {
                throw new NicknameException("Duplicated Email ! ");
            }


            UserEntity existingUser = userRepository.findByUserId(userId);
            UserEntity patchRequestUser = UserEntity.toUserEntity(userDTO);
            patchRequestUser.setUserId(userId);

            BeanUtils.copyProperties(patchRequestUser, existingUser, getNullPropertyNames(patchRequestUser));

            userRepository.save(existingUser);

            UserDTO responseDTO = UserDTO.toUserDTO(existingUser);
            responseDTO.setUserId(userId);

            ObjectNode response = userSelf(responseDTO);
            return response;
        }
        catch(Error e){
            throw new SQLException(" User Patch SQL Error ! ");
        }
    }

    private String[] getNullPropertyNames(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<>();
        for (PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }
        emptyNames.add("userPw");
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }

    public String userDelete(int userId) throws MessagingException {
        try{
            UserEntity existingUser = userRepository.findByUserId(userId);

            userRepository.delete(existingUser);

            return "delete";
        }
        catch(Error e){
            throw new SQLException(" User Delete SQL Error ! ");
        }
    }

}
