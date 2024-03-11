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
import org.algorithm.algorithm.dto.*;
import org.algorithm.algorithm.entity.*;
import org.algorithm.algorithm.exception.*;
import org.algorithm.algorithm.repository.*;
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
import java.util.*;

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

    public final ResponseUserRepository responseUserRepository;
    public final RecommendBoardRepository recommendBoardRepository;
    public final BoardViewRepository boardViewRepository;
    public final AdoptFeedbackRepository adoptFeedbackRepository;
    public final AdoptRepository adoptRepository;
    public final TagRepository tagRepository;
    public final BoardRepository boardRepository;


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
            List<BoardEntity> resultValue = boardRepository.findQuestionByUserId(userDTO.getUserId());


            ObjectMapper objectMapper = new ObjectMapper();
            ArrayNode linksArrayNode = objectMapper.createArrayNode();


            for (BoardEntity linkParts : resultValue) {
                BoardDTO boardDTO = BoardDTO.toBoardDTO(linkParts);
                String tempId = null;
                ObjectNode linkNode = createBoardNode(boardDTO, userDTO);
//                linkNode.put("recommend", userRepository.findRecommendByBoardId(tempId));
                linksArrayNode.add(linkNode);
                System.out.println(linkNode);

            }
            ObjectNode responseNode = objectMapper.createObjectNode();
            responseNode.set("userId", objectMapper.convertValue(userDTO.getUserId(), JsonNode.class));
            responseNode.set("results", linksArrayNode);
            responseNode.set("totals", objectMapper.convertValue(resultValue.size(), JsonNode.class));
            System.out.println(responseNode);

            return responseNode;
        }
        catch(Error e) {
            throw new SQLException("GET MyPage Question Error ! ");
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
    public ObjectNode userMypageFeedback(UserDTO userDTO) {
        try {
            List<BoardEntity> resultValue = boardRepository.findFeedbackByUserId(userDTO.getUserId());


            ObjectMapper objectMapper = new ObjectMapper();
            ArrayNode linksArrayNode = objectMapper.createArrayNode();


            for (BoardEntity linkParts : resultValue) {
                BoardDTO boardDTO = BoardDTO.toBoardDTO(linkParts);
                String tempId = null;
                ObjectNode linkNode = createBoardNode(boardDTO, userDTO);
//                linkNode.put("recommend", userRepository.findRecommendByBoardId(tempId));
                linksArrayNode.add(linkNode);
                System.out.println(linkNode);

            }
            ObjectNode responseNode = objectMapper.createObjectNode();
            responseNode.set("userId", objectMapper.convertValue(userDTO.getUserId(), JsonNode.class));
            responseNode.set("results", linksArrayNode);
            responseNode.set("totals", objectMapper.convertValue(resultValue.size(), JsonNode.class));
            System.out.println(responseNode);

            return responseNode;
        }
        catch(Error e){
            throw new SQLException("GET MyPage Feedback Error ! ");
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public ObjectNode userMypageFree(UserDTO userDTO) {
        try {

            List<BoardEntity> resultValue = boardRepository.findFreeByUserId(userDTO.getUserId());


            ObjectMapper objectMapper = new ObjectMapper();
            ArrayNode linksArrayNode = objectMapper.createArrayNode();


            for (BoardEntity linkParts : resultValue) {
                BoardDTO boardDTO = BoardDTO.toBoardDTO(linkParts);
                String tempId = null;
                ObjectNode linkNode = createBoardNode(boardDTO, userDTO);
//                linkNode.put("recommend", userRepository.findRecommendByBoardId(tempId));
                linksArrayNode.add(linkNode);
                System.out.println(linkNode);

            }
            ObjectNode responseNode = objectMapper.createObjectNode();
            responseNode.set("userId", objectMapper.convertValue(userDTO.getUserId(), JsonNode.class));
            responseNode.set("results", linksArrayNode);
            responseNode.set("totals", objectMapper.convertValue(resultValue.size(), JsonNode.class));
            System.out.println(responseNode);

            return responseNode;
        }
        catch(Error e){
            throw new SQLException("GET MyPage FreeBoard Error ! ");
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public ObjectNode userMypageAnswer(UserDTO userDTO) {
        try {
            List<MyPageAnswerInterface> resultValue = boardRepository.findAnswerByUserId(userDTO.getUserId());

            ObjectMapper objectMapper = new ObjectMapper();
            ArrayNode linksArrayNode = objectMapper.createArrayNode();


            for (MyPageAnswerInterface linkParts : resultValue) {
                ObjectNode linkNode = objectMapper.createObjectNode();
                linkNode.put("boardId",linkParts.getBoard_id());
                linkNode.put("boardType",linkParts.getBoard_type());
                linkNode.put("title",linkParts.getTitle());
                linkNode.put("content",linkParts.getContent());
                linkNode.put("solved",linkParts.getSolved());
                linkNode.put("views",linkParts.getViews());
                linkNode.put("createdTime", String.valueOf(linkParts.getCreated_time()));
                linksArrayNode.add(linkNode);
                System.out.println(linkNode);

            }
            ObjectNode responseNode = objectMapper.createObjectNode();
            responseNode.set("userId", objectMapper.convertValue(userDTO.getUserId(), JsonNode.class));
            responseNode.set("results", linksArrayNode);
            responseNode.set("totals", objectMapper.convertValue(resultValue.size(), JsonNode.class));
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
            List<BoardEntity> resultValue = boardRepository.findFavoriteBoardByUserId(userDTO.getUserId());


            ObjectMapper objectMapper = new ObjectMapper();
            ArrayNode linksArrayNode = objectMapper.createArrayNode();



            for (BoardEntity linkParts : resultValue) {
                BoardDTO boardDTO = BoardDTO.toBoardDTO(linkParts);
                String tempId = null;
                ObjectNode linkNode = createBoardNode(boardDTO, userDTO);
//                linkNode.put("recommend", userRepository.findRecommendByBoardId(tempId));
                linksArrayNode.add(linkNode);
                System.out.println(linkNode);

            }
            ObjectNode responseNode = objectMapper.createObjectNode();
            responseNode.set("userId", objectMapper.convertValue(userDTO.getUserId(), JsonNode.class));
            responseNode.set("results", linksArrayNode);
            responseNode.set("totals", objectMapper.convertValue(resultValue.size(), JsonNode.class));
            System.out.println(responseNode);

            return responseNode;
        }
        catch(Error e ){
            throw new SQLException("GET MyPage Favorite Error !");
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public ObjectNode userLinkPost(int userId, UserLinkEntity userLinkEntity) {
        try {

            if(userLinkRepository.findUserLinkEntityByDomain(userLinkEntity.getDomain()) != null)
                throw new DuplicatedExcepiton("Already Exist Domain ! ");

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
            if(emailVerifyEntity == null)
                throw new NotFoundException("Verify Email Not Found !! Input Email : " + emailVerifyDTO.getEmail());

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

    private ObjectNode createBoardNode(BoardDTO boardDTO, UserDTO userDTO) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode boardNode = objectMapper.createObjectNode();
        Set<Long> validSolved = new HashSet<>(Arrays.asList(1L,3L,4L));
        Set<Long> feedbackSolved = new HashSet<>(Arrays.asList(4L));

        // boardId로 recommendCount 추출
        String recommendCount = recommendBoardRepository.findCountByBoardId(boardDTO.getBoardId());
        if(recommendCount == null)
            recommendCount = "0";

        // boardId로 views 추출 코드
        String views = boardViewRepository.countByBoardId(boardDTO.getBoardId());
        if(views == null)
            views = "0";

        // boardId로 solved 추출 코드 작성 요망
        Boolean solved;
        if(feedbackSolved.contains(boardDTO.getBoardType())) {
            solved = adoptFeedbackRepository.findByBoardId(boardDTO.getBoardId()) != null;
        }
        else
            solved = adoptRepository.findByBoardId(boardDTO.getBoardId()) != null;

        // boardId로 tags 추출 코드 작성 요망
//        String[] tags = ["자유분방","천방지축"];
        List<String> tagList = tagRepository.findValuesByBoardId(boardDTO.getBoardId());
        ObjectMapper mapper = new ObjectMapper();
        ArrayNode tagNode = mapper.createArrayNode();

        // tagList를 ArrayNode에 추가
        for (String tag : tagList) {
            tagNode.add(tag);
        }

        // boardId로 commentCount 추출 코드 작성 요망
        String commentCount = boardRepository.findCommentCountByBoardId(boardDTO.getBoardId());
        if (commentCount == null)
            commentCount = "0";
//
////        // boardId로 isRecommend 추출 코드 작성 요망
//        Boolean isRecommend = recommendBoardRepository.findByBoardIdAndUserId(boardDTO.getBoardId(),userDTO.getUserId()) != null;
////
////        // boardId로 isView 추출 코드 작성 요망
//        Boolean isView = boardViewRepository.findByBoardIdAndUserId(boardDTO.getBoardId(),userDTO.getUserId()) != null;

        boardNode.put("boardId", boardDTO.getBoardId());
        boardNode.put("boardType", boardDTO.getBoardType());
        boardNode.put("title", boardDTO.getTitle());
        boardNode.put("content", boardDTO.getContent());
        if(validSolved.contains(boardDTO.getBoardType()))
            boardNode.put("solved", solved);
        boardNode.put("views", views);
        boardNode.put("recommendCount", recommendCount);
        boardNode.set("tags", tagNode);
        boardNode.put("commentCount", commentCount);
//        boardNode.put("isRecommend", isRecommend);
//        boardNode.put("isView", isView);
        boardNode.put("createdTime", String.valueOf(boardDTO.getCreatedTime()));

        return boardNode;
    }

}
