package com.college.algorithm.service;

import com.college.algorithm.dto.*;
import com.college.algorithm.entity.*;
import com.college.algorithm.exception.CustomException;
import com.college.algorithm.exception.ErrorCode;
import com.college.algorithm.mapper.AlgorithmMapper;
import com.college.algorithm.mapper.BoardMapper;
import com.college.algorithm.mapper.UserMapper;
import com.college.algorithm.repository.*;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.CurrentTimestamp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardTypeRepository kindRepository;
    private final BoardRepository boardRepository;
    private final BoardRecommendRepository recommendRepository;
    private final BoardViewRepository boardViewRepository;
    private final BoardSuggestRepository suggestRepository;

    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final TagRepository tagRepository;

    public ResponseBoardsDto getBoards(int page, int count, String searchType, String keyword, Long loginUserId){
        Pageable pageable = PageRequest.of(page-1, count);
        Page<Board> boards = null;
        BoardType searchType1,searchType2;
        switch (searchType){
            case "p":
                searchType1 = kindRepository.findBoardTypeByTypeName("일반 질문");
                searchType2 = kindRepository.findBoardTypeByTypeName("일반 자유");
                boards = boardRepository.findAllByBoardType_TypeIdOrBoardType_TypeIdAndTitleContaining(pageable,searchType1.getTypeId(),searchType2.getTypeId(),keyword);
                break;
            case "pq":
                searchType1 = kindRepository.findBoardTypeByTypeName("일반 질문");
                boards = boardRepository.findAllByBoardType_TypeIdAndTitleContaining(pageable,searchType1.getTypeId(),keyword);
                break;
            case "pf":
                searchType1 = kindRepository.findBoardTypeByTypeName("일반 자유");
                boards = boardRepository.findAllByBoardType_TypeIdAndTitleContaining(pageable,searchType1.getTypeId(),keyword);
                break;
            case "a":
                searchType1 = kindRepository.findBoardTypeByTypeName("알고리즘 질문");
                searchType2 = kindRepository.findBoardTypeByTypeName("알고리즘 자유");
                boards = boardRepository.findAllByBoardType_TypeIdOrBoardType_TypeIdAndTitleContaining(pageable,searchType1.getTypeId(),searchType2.getTypeId(),keyword);
                break;
            case "aq":
                searchType1 = kindRepository.findBoardTypeByTypeName("알고리즘 질문");
                boards = boardRepository.findAllByBoardType_TypeIdAndTitleContaining(pageable,searchType1.getTypeId(),keyword);
                break;
            case "af":
                searchType1 = kindRepository.findBoardTypeByTypeName("알고리즘 자유");
                boards = boardRepository.findAllByBoardType_TypeIdAndTitleContaining(pageable,searchType1.getTypeId(),keyword);
                break;
        }

        List<BoardDto> dtos = new ArrayList<>();
        int total = 0;
        for(Board board : boards){
            ResponseBoardUserDto user = UserMapper.INSTANCE.toResponseBoardUserDto(board.getUser());

            Boolean isSolved = false;// 뭐지? adopt 테이블이 삭제되면서 알 수가 없ㄴㄴ데?

            Boolean isRecommend = null;
            if(loginUserId != null)
                isRecommend = recommendRepository.countByBoard_BoardIdAndUserUserId(board.getBoardId(), loginUserId) >= 1;

            List<Tag> tags = tagRepository.findAllByBoard_BoardId(board.getBoardId());
            List<String> tagNames = new ArrayList<>();
            for(Tag tag : tags)
                tagNames.add(tag.getContent());
            if(tagNames.isEmpty())
                tagNames = null;

            dtos.add(BoardMapper.INSTANCE.toBoardDto(board,user,tagNames,isSolved,isRecommend));
            total++;
        }

        return new ResponseBoardsDto(dtos,total);
    }
    public ResponseBoardTypeDto getKinds(){

        List<BoardType> types = kindRepository.findAll();
        ResponseBoardTypeDto response = new ResponseBoardTypeDto();
        List<BoardTypeDto> dtos = new ArrayList<>();

        for(BoardType type : types){
            BoardTypeDto typeDto = new BoardTypeDto(Integer.parseInt(String.valueOf(type.getTypeId())),type.getTypeName());
            dtos.add(typeDto);
        }
        response.setTypes(dtos);

        return response;
    }
    public ResponseBoardDetailDto getBoardDetail(Long boardId, Long loginUserId){
        Board board = boardRepository.findByBoardId(boardId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));

        ResponseBoardUserDto user = UserMapper.INSTANCE.toResponseBoardUserDto(board.getUser());

        Boolean isSolved = false;// 뭐지? adopt 테이블이 삭제되면서 알 수가 없ㄴㄴ데?

        Boolean isView = null;
        if(loginUserId != null)
            isView = boardViewRepository.countByBoard_BoardIdAndUserUserId(board.getBoardId(), loginUserId) >= 1;

        Boolean isRecommend = null;
        if(loginUserId != null)
            isRecommend = recommendRepository.countByBoard_BoardIdAndUserUserId(board.getBoardId(), loginUserId) >= 1;

        List<Tag> tags = tagRepository.findAllByBoard_BoardId(board.getBoardId());
        List<String> tagNames = new ArrayList<>();
        for(Tag tag : tags)
            tagNames.add(tag.getContent());
        if(tagNames.isEmpty())
            tagNames = null;


        return BoardMapper.INSTANCE.toResponseBoardDetailDto(board,user,tagNames,isSolved,isView,isRecommend);
    }
    public ResponseBoardSuggestDto getSuggestBoards(){
        List<BoardSuggest> boards = suggestRepository.findAll();

        if(boards.isEmpty())
            throw new CustomException(ErrorCode.NOT_FOUND_SUGGEST);

        List<BoardSuggestDto> dtos = new ArrayList<>();

        for(BoardSuggest boardSuggest : boards) {
            ResponseBoardUserDto user = UserMapper.INSTANCE.toResponseBoardUserDto(boardSuggest.getBoard().getUser());
            List<Tag> tags = tagRepository.findAllByBoard_BoardId(boardSuggest.getBoard().getBoardId());
            List<String> tagNames = new ArrayList<>();
            for(Tag tag : tags)
                tagNames.add(tag.getContent());
            if(tagNames.isEmpty())
                tagNames = null;

            dtos.add(BoardMapper.INSTANCE.toBoardSuggestDto(boardSuggest.getBoard(),user,tagNames));
        }


        return new ResponseBoardSuggestDto(dtos);
    }
    public ResponseBoardCommentDto getBoardComments(int page, int count, Long boardId){

        if(boardRepository.findByBoardId(boardId) == null)
            throw new CustomException(ErrorCode.NOT_FOUND_BOARD);

        Pageable pageable = PageRequest.of(page-1, count);
        Page<Comment> comments = commentRepository.findAllByBoardBoardId(pageable, boardId);
        List<BoardCommentDto> dtos = new ArrayList<>();
        int total = 0;
        for(Comment comment : comments){
            ResponseBoardUserDto user = UserMapper.INSTANCE.toResponseBoardUserDto(comment.getUser());

            dtos.add(BoardMapper.INSTANCE.toBoardCommentDto(comment,user));
            total++;
        }

        return new ResponseBoardCommentDto(dtos,total);
    }
    public HttpStatus postBoardRecommend(Long boardId, Long loginUserId){

        AppUser user = userRepository.findByUserId(loginUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        Board board = boardRepository.findByBoardId(boardId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));

        if(board.getDeleted())
            throw new CustomException(ErrorCode.DELETED_BOARD);

        if(recommendRepository.findByBoard_BoardIdAndUser_UserId(boardId, loginUserId) != null)
            throw new CustomException(ErrorCode.DUPLICATE_RECOMMEND);


        BoardRecommend recommend = new BoardRecommend(user, board);

        recommendRepository.save(recommend);
        board.setRecommendCount(recommendRepository.countByBoard_BoardId(boardId));
        boardRepository.save(board);

        return HttpStatus.CREATED;
    }
    public HttpStatus postBoardComment(Long boardId, RequestBoardComment requestBoardComment, Long loginUserId){

        AppUser user = userRepository.findByUserId(loginUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        Board board = boardRepository.findByBoardId(boardId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));

        if(board.getDeleted())
            throw new CustomException(ErrorCode.DELETED_BOARD);

        Comment comment = new Comment(user, board, null, requestBoardComment.getContent());

        commentRepository.save(comment);

        return HttpStatus.CREATED;
    }
    public HttpStatus patchBoard(RequestBoardUpdateDto boardUpdateDto,Long boardId, Long loginUserId){

        AppUser user = userRepository.findByUserId(loginUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        Board board = boardRepository.findByBoardId(boardId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));

        if(board.getDeleted())
            throw new CustomException(ErrorCode.DELETED_BOARD);

        if(!Objects.equals(user.getUserId(), board.getUser().getUserId()))
            throw new CustomException(ErrorCode.NOT_MATCHED_USER);

        if(board.getBoardType().getTypeId() == '1' || board.getBoardType().getTypeId() == '2'){
            if(boardUpdateDto.getBoardType() == 3L || boardUpdateDto.getBoardType() == 4L)
                throw new CustomException(ErrorCode.BAD_REQUEST_BOARD_TYPE);
        }
        if(board.getBoardType().getTypeId() == '3' || board.getBoardType().getTypeId() == '4'){
            if(boardUpdateDto.getBoardType() == 1L || boardUpdateDto.getBoardType() == 2L)
                throw new CustomException(ErrorCode.BAD_REQUEST_BOARD_TYPE);
        }

        List<Tag> tags = tagRepository.findAllByBoard_BoardId(board.getBoardId());
        tagRepository.deleteAll(tags);

        if(boardUpdateDto.getTags()!=null) {
            for (String content : boardUpdateDto.getTags()) {
                Tag tag = new Tag(board, content);
                tagRepository.save(tag);
            }
        }

        board.setTitle(boardUpdateDto.getTitle());
        board.setContent(boardUpdateDto.getContent());
        board.setBoardType(kindRepository.findBoardTypeByTypeId(Character.forDigit(boardUpdateDto.getBoardType(),10)));

        boardRepository.save(board);

        return HttpStatus.OK;
    }
    public HttpStatus deleteBoardRecommend(Long boardId, Long loginUserId){

        AppUser user = userRepository.findByUserId(loginUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        Board board = boardRepository.findByBoardId(boardId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        if(board.getDeleted())
            throw new CustomException(ErrorCode.DELETED_BOARD);

        BoardRecommend recommend = recommendRepository.findByBoard_BoardIdAndUser_UserId(boardId, user.getUserId());

        if(recommend == null)
            throw new CustomException(ErrorCode.NOT_FOUND_RECOMMEND);

        if(!recommend.getUser().getUserId().equals(loginUserId))
            throw new CustomException(ErrorCode.NOT_MATCHED_USER);

        recommendRepository.delete(recommend);
        board.setRecommendCount(recommendRepository.countByBoard_BoardId(boardId));
        boardRepository.save(board);

        return HttpStatus.OK;
    }
    public HttpStatus deleteBoard(Long boardId, Long loginUserId){

        AppUser user = userRepository.findByUserId(loginUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        Board board = boardRepository.findByBoardId(boardId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));

        if(board.getDeleted())
            throw new CustomException(ErrorCode.DELETED_BOARD);

        if(!board.getUser().getUserId().equals(loginUserId))
            throw new CustomException(ErrorCode.NOT_MATCHED_USER);

        board.setDeleted(true);
        board.setDeletedTime(LocalDateTime.now());

        boardRepository.save(board);

        return HttpStatus.OK;
    }
}
