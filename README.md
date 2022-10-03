# SNS

SNS 서비스 입니다.
<br><br>

## 📌 서비스 개요

- 본 서비스는 SNS 서비스 입니다.
- 사용자는 게시물을 업로드 하거나 다른 사람의 게시물을 확인하고, 좋아요를 누를 수 있습니다.

## 📌 요구사항 분석 및 구현



### 1. 유저 회원가입 및 로그인
- JWT 토큰을 발급하여 추후 사용자 인증에 사용합니다.

### 2. 게시글 생성
- 제목, 내용, 해시태그를 입력하여 게시글을 작성합니다.

### 3. 게시글 수정
- 해당 게시글의 작성자만 게시글을 수정할 수 있습니다.

### 4. 게시글 삭제
- 해당 게시글의 작성자만 게시글을 삭제할 수 있습니다.
- Soft Delet를 사용하여 삭제한 게시글을 복구 할 수 있습니다.

### 5. 게시글 상세보기
- 해당 게시글을 볼 수 있습니다.
- 상세보기 시 조회수가 1 증가합니다.
- 좋아요를 누르거나 취소할 수 있습니다.

### 6. 게시글 목록
- 제목, 작성자, 해시태그(아직 미적용), 작성일, 좋아요 수, 조회수가 포함됩니다.
- 아래 4가지 동작이 각각 및 동시에 작용 됩니다.
- 1. Ordering : 작성일, 좋아요 수, 조회수 로 정렬할 수 있습니다.(ex. orderBy=조회수 order=DESC) default(orderBy=작성일 order=DESC)
- 2. Searching : 검색어로 게시글의 제목을 검색할 수 있습니다.(ex. search=검색어)
- 3. Filtering : 해시태그로 검색(구현중)
- 4. Pagination : 1페이지 당 게시글 수를 조정할 수 있습니다.(ex. page=1 limit=10) default(page=1 limit=10)
## 📌 DB Modeling

- <img width="414" alt="디비다이어그램" src="https://user-images.githubusercontent.com/19259688/193525076-45ef0a70-ea51-46c3-89b4-10253455d4fd.png">



## 📌 API DOCS
- [포스트맨 API DOCS](https://documenter.getpostman.com/view/21381599/2s83tJEVUp)

<br><br>

## 📌 적용 기술

- 사용언어 : Javascript
- 런타임 환경 : Node.js
- 프레임워크 : Express
- ORM : Sequelize
- 데이터베이스 : MySQL
  <br/> <br/>

## 📌 Commit Convention

- feat : 새로운 기능 추가
- fix : 버그 수정
- docs : 문서 수정
- style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우, linting
- refactor : 코드 리팩터링
- test : 테스트 코드, 리팩터링 테스트 코드 추가
- chore : 빌드 업무 수정, 패키지 매니저 수정, 그 외 자잘한 수정에 대한 커밋
