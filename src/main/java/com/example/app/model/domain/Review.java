package com.example.app.model.domain;


import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Review {

    @Id
    @SequenceGenerator(name = "review_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "review_seq")
    private Long reviewIdx;

    private String userId;
    private Long userIdx;

    private String reviewTitle;
    private String reviewContent;

    private Long bookIdx;

    private int reviewScore;

    @CreationTimestamp
    private Date reviewDate;

    @UpdateTimestamp
    private Date reviewModify;


//    리뷰테이블
//
//    작성자
//    제목
//    내용
//    상품인덱스
//    별점
//    등록일
//    수정일


//    리뷰 테이블
//    인덱스 pk - review_idx (number)
//    리뷰 제목 - review_title (varchar2)
//    리뷰 내용 - review_content (varchar2)
//    리뷰 작성일 - review_date (date)
//    리뷰 수정일 - review_modify (date)
//    리뷰 평점 - review_score (number)
//    리뷰 작성자 ID FK - reviewer_id (varchar2)
//    (user 테이블의 user_id 사용)


}
