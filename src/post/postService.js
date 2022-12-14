const postRepo = require("./postRepository");

// 회원가입
async function createPost(postInfo, userId) {
  const { title, content, hashtags } = postInfo;
  const newPost = await postRepo.createPost(title, content, userId);

  if (hashtags) {
    //hashtag 존재 시
    //hashtag 배열 형태로 처리
    let tags = hashtags.replace(/\#/g, "").split(",");

    for (let i = 0; i < tags.length; i++) {
      const isExistedTag = await postRepo.readTagByName(tags[i]);
      let tag;
      // tag 존재시 post_tag 테이블에 추가
      if (isExistedTag) {
        postRepo.createPostTag(newPost.id, isExistedTag.id);
      } else {
        // tag 존재하지 않을 시  tag 테이블에 추가 후 post_tag 테이블에 추가
        tag = await postRepo.createTag(tags[i]);
        postRepo.createPostTag(newPost.id, tag.id);
      }
    }
  }
}

async function updatePost(updateInfo, userId, postId) {
  const postInfo = await postRepo.readPostById(postId);
  // 게시글 존재 유무 체크
  if (!postInfo) {
    const error = new Error("존재하지 않는 게시글 입니다.");
    error.statusCode = 404;
    throw error;
  }
  // 해당 게시글 작성자인지 체크
  if (postInfo.user_id !== userId) {
    const error = new Error("해당 게시글에 대한 권한이 없습니다.");
    error.statusCode = 404;
    throw error;
  }
  postRepo.updatePost(updateInfo, postId);
  if (updateInfo.is_deleted == true) {
    return { message: "게시글 삭제 완료" };
  } else if (updateInfo.is_deleted == false) {
    return { message: "게시글 복구 완료" };
  } else {
    return { message: "게시글 수정 완료" };
  }
}

async function readPost(postId) {
  const postInfo = await postRepo.readPostById(postId);
  if (!postInfo || postInfo.is_deleted == 1) {
    // 게시글이 존재하지 않거나 삭제된 게시글인 경우
    const error = new Error("존재하지 않는 게시글 입니다.");
    error.statusCode = 404;
    throw error;
  }
  //조회수 업데이트
  const updateInfo = {
    hit: postInfo.hit + 1,
  };
  postInfo.hit++;
  postRepo.updatePost(updateInfo, postId);
  return postInfo;
}

async function likePost(postId, userId) {
  const postInfo = await postRepo.readPostById(postId);
  if (!postInfo || postInfo.is_deleted == 1) {
    // 게시글이 존재하지 않거나 삭제된 게시글인 경우
    const error = new Error("존재하지 않는 게시글 입니다.");
    error.statusCode = 404;
    throw error;
  }
  const isLiked = await postRepo.readLikeByPostIdAndUserId(postId, userId);
  if (!isLiked) {
    //좋아요 아닌 경우에는 좋아요
    await postRepo.createLike(postId, userId);
    return { isLiked: true };
  } else {
    // 좋아요 취소
    await postRepo.deleteLike(postId, userId);
    return { isLiked: false };
  }
}

async function readPostList(condition) {
  // default 값 세팅
  if (!condition.orderBy) {
    condition.orderBy = "작성일";
  }
  if (!condition.order) {
    condition.order = "DESC";
  }
  if (!condition.page) {
    condition.page = 1;
  }
  if (!condition.limit) {
    condition.limit = 10;
  }
  console.log(condition);
  const data = await postRepo.readPostList(condition);
  return data;
}

module.exports = {
  createPost,
  updatePost,
  readPost,
  likePost,
  readPostList,
};
