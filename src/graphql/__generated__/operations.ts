// Code generated by graphql-codegen. DO NOT EDIT.
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type CreateMediaMutationVariables = Exact<{
  file: Scalars['Upload'];
  filename: Scalars['String'];
  contentType: Scalars['String'];
  width: Scalars['Int'];
  height: Scalars['Int'];
  ratio: Scalars['Float'];
}>;


export type CreateMediaMutation = { __typename?: 'Mutation', createMedia?: { __typename?: 'Media', uuid: string, filename: string, width: number, height: number, ratio: number, s3Key: string, s3Bucket: string, createdAt: any, updatedAt: any } | null };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: File;
};

export type Action = {
  __typename?: 'Action';
  commentAction: Array<CommentAction>;
  createdAt: Scalars['DateTime'];
  mediaActions: Array<MediaAction>;
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userUuid: Scalars['String'];
  uuid: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  commentActions: Array<CommentAction>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  mediaComments: Array<MediaComment>;
  mediaUuid: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userUuid: Scalars['String'];
  uuid: Scalars['String'];
};

export type CommentAction = {
  __typename?: 'CommentAction';
  action: Action;
  actionUuid: Scalars['String'];
  comment: Comment;
  commentUuid: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  uuid: Scalars['String'];
};

export type Evaluation = {
  __typename?: 'Evaluation';
  createdAt: Scalars['DateTime'];
  mediaEvaluations: Array<MediaEvaluation>;
  tagEvaluations: Array<TagEvaluation>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userUuid: Scalars['String'];
  uuid: Scalars['String'];
  value: Scalars['Float'];
};

export type Favorite = {
  __typename?: 'Favorite';
  createdAt: Scalars['DateTime'];
  media: Media;
  mediaUuid: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userUuid: Scalars['String'];
  uuid: Scalars['String'];
};

export type Media = {
  __typename?: 'Media';
  actions: Array<MediaAction>;
  childMedias: Array<Media>;
  comments: Array<MediaComment>;
  createdAt: Scalars['DateTime'];
  evaluations: Array<MediaEvaluation>;
  favorites: Array<Favorite>;
  filename: Scalars['String'];
  height: Scalars['Int'];
  mediaTags: Array<MediaTag>;
  parentMedia?: Maybe<Media>;
  parentMediaUuid?: Maybe<Scalars['String']>;
  post: Post;
  postUuid: Scalars['String'];
  ratio: Scalars['Float'];
  s3Bucket: Scalars['String'];
  s3Key: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  uuid: Scalars['String'];
  width: Scalars['Int'];
};

export type MediaAction = {
  __typename?: 'MediaAction';
  action: Action;
  actionUuid: Scalars['String'];
  createdAt: Scalars['DateTime'];
  media: Media;
  mediaUuid: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  uuid: Scalars['String'];
};

export type MediaComment = {
  __typename?: 'MediaComment';
  comment: Comment;
  commentUuid: Scalars['String'];
  createdAt: Scalars['DateTime'];
  media: Media;
  mediaUuid: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  uuid: Scalars['String'];
};

export type MediaEvaluation = {
  __typename?: 'MediaEvaluation';
  createdAt: Scalars['DateTime'];
  evaluation: Evaluation;
  evaluationUuid: Scalars['String'];
  media: Media;
  mediaUuid: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  uuid: Scalars['String'];
};

export type MediaTag = {
  __typename?: 'MediaTag';
  createdAt: Scalars['DateTime'];
  media: Media;
  mediaUuid: Scalars['String'];
  tag: Tag;
  tagEvaluations: Array<TagEvaluation>;
  tagUuid: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  uuid: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** コメントに対してアクションを追加する */
  addActionToComment?: Maybe<CommentAction>;
  /** メディアに対してアクションを追加する */
  addActionToMedia?: Maybe<MediaAction>;
  /** コメントのコメントを追加する */
  addCommentToComment?: Maybe<Comment>;
  /** メディアのコメントを追加する */
  addCommentToMedia?: Maybe<MediaComment>;
  /** メディアの評価を追加する */
  addEvaluationToMedia?: Maybe<MediaEvaluation>;
  /** タグの評価を追加する */
  addEvaluationToTag?: Maybe<TagEvaluation>;
  /** メディアをお気に入りに追加する */
  addMediaToFavorites?: Maybe<Favorite>;
  /** メディアにタグを追加する */
  addTagToMedia?: Maybe<MediaTag>;
  /** 新しいコメントを作成する */
  createComment?: Maybe<Comment>;
  /** 新しいメディアを作成する */
  createMedia?: Maybe<Media>;
  /** 新しいポストを作成する */
  createPost?: Maybe<Post>;
  /** 新しいタグを作成する */
  createTag?: Maybe<Tag>;
  /** 新しいユーザーを作成する */
  createUser?: Maybe<User>;
  /** メディアからお気に入りを削除する */
  removeMediaFromFavorites?: Maybe<Favorite>;
};


export type MutationAddActionToCommentArgs = {
  actionType: Scalars['String'];
  commentUuid: Scalars['String'];
  userUuid: Scalars['String'];
};


export type MutationAddActionToMediaArgs = {
  actionType: Scalars['String'];
  mediaUuid: Scalars['String'];
  userUuid: Scalars['String'];
};


export type MutationAddCommentToCommentArgs = {
  commentUuid: Scalars['String'];
  content: Scalars['String'];
  userUuid: Scalars['String'];
};


export type MutationAddCommentToMediaArgs = {
  content: Scalars['String'];
  mediaUuid: Scalars['String'];
  userUuid: Scalars['String'];
};


export type MutationAddEvaluationToMediaArgs = {
  evaluationUuid: Scalars['String'];
  mediaUuid: Scalars['String'];
  userUuid: Scalars['String'];
};


export type MutationAddEvaluationToTagArgs = {
  evaluationUuid: Scalars['String'];
  tagUuid: Scalars['String'];
  userUuid: Scalars['String'];
};


export type MutationAddMediaToFavoritesArgs = {
  mediaUuid: Scalars['String'];
  userUuid: Scalars['String'];
};


export type MutationAddTagToMediaArgs = {
  mediaUuid: Scalars['String'];
  tagUuid: Scalars['String'];
  userUuid: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  content: Scalars['String'];
  mediaUuid: Scalars['String'];
  userUuid: Scalars['String'];
};


export type MutationCreateMediaArgs = {
  contentType: Scalars['String'];
  file: Scalars['Upload'];
  filename: Scalars['String'];
  height: Scalars['Int'];
  ratio: Scalars['Float'];
  width: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  content?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  userUuid: Scalars['String'];
};


export type MutationCreateTagArgs = {
  name: Scalars['String'];
  userUuid: Scalars['String'];
};


export type MutationCreateUserArgs = {
  username: Scalars['String'];
};


export type MutationRemoveMediaFromFavoritesArgs = {
  favoriteUuid: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  media: Array<Media>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userUuid: Scalars['String'];
  uuid: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** 複数のコメントを取得する */
  comments: Array<Comment>;
  /** 特定のメディアを取得する */
  media?: Maybe<Media>;
  /** ポストの一覧を取得する */
  posts: Array<Post>;
  /** 複数のタグを取得する */
  tags: Array<Tag>;
  /** 特定のユーザーを取得する */
  user?: Maybe<User>;
};


export type QueryCommentsArgs = {
  mediaUuid: Scalars['String'];
};


export type QueryMediaArgs = {
  uuid: Scalars['String'];
};


export type QueryTagsArgs = {
  uuids: Array<Scalars['String']>;
};


export type QueryUserArgs = {
  uuid: Scalars['String'];
};

export type ResMedia = {
  __typename?: 'ResMedia';
  createdAt: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['String'];
  url: Scalars['String'];
  uuid: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  createdAt: Scalars['DateTime'];
  mediaTags: Array<MediaTag>;
  name: Scalars['String'];
  tagEvaluations: Array<TagEvaluation>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userUuid: Scalars['String'];
  uuid: Scalars['String'];
};

export type TagEvaluation = {
  __typename?: 'TagEvaluation';
  createdAt: Scalars['DateTime'];
  evaluation: Evaluation;
  evaluationUuid: Scalars['String'];
  mediaTag?: Maybe<MediaTag>;
  tag: Tag;
  tagUuid: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  uuid: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  evaluations: Array<Evaluation>;
  favorites: Array<Favorite>;
  mediaActions: Array<Action>;
  posts: Array<Post>;
  tags: Array<Tag>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
  uuid: Scalars['String'];
};
