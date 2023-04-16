// Code generated by graphql-codegen. DO NOT EDIT.
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type Action = {
  readonly __typename?: 'Action';
  readonly commentAction: ReadonlyArray<CommentAction>;
  readonly createdAt: Scalars['DateTime'];
  readonly mediaActions: ReadonlyArray<MediaAction>;
  readonly type: Scalars['String'];
  readonly updatedAt: Scalars['DateTime'];
  readonly user: User;
  readonly userUuid: Scalars['String'];
  readonly uuid: Scalars['String'];
};

export type Comment = {
  readonly __typename?: 'Comment';
  readonly commentActions: ReadonlyArray<CommentAction>;
  readonly content: Scalars['String'];
  readonly createdAt: Scalars['DateTime'];
  readonly mediaComments: ReadonlyArray<MediaComment>;
  readonly mediaUuid: Scalars['String'];
  readonly updatedAt: Scalars['DateTime'];
  readonly user: User;
  readonly userUuid: Scalars['String'];
  readonly uuid: Scalars['String'];
};

export type CommentAction = {
  readonly __typename?: 'CommentAction';
  readonly action: Action;
  readonly actionUuid: Scalars['String'];
  readonly comment: Comment;
  readonly commentUuid: Scalars['String'];
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
  readonly uuid: Scalars['String'];
};

export type Evaluation = {
  readonly __typename?: 'Evaluation';
  readonly createdAt: Scalars['DateTime'];
  readonly mediaEvaluations: ReadonlyArray<MediaEvaluation>;
  readonly tagEvaluations: ReadonlyArray<TagEvaluation>;
  readonly updatedAt: Scalars['DateTime'];
  readonly user: User;
  readonly userUuid: Scalars['String'];
  readonly uuid: Scalars['String'];
  readonly value: Scalars['Float'];
};

export type Favorite = {
  readonly __typename?: 'Favorite';
  readonly createdAt: Scalars['DateTime'];
  readonly media: Media;
  readonly mediaUuid: Scalars['String'];
  readonly updatedAt: Scalars['DateTime'];
  readonly user: User;
  readonly userUuid: Scalars['String'];
  readonly uuid: Scalars['String'];
};

export type Media = {
  readonly __typename?: 'Media';
  readonly actions: ReadonlyArray<MediaAction>;
  readonly childMedias: ReadonlyArray<Media>;
  readonly comments: ReadonlyArray<MediaComment>;
  readonly createdAt: Scalars['DateTime'];
  readonly evaluations: ReadonlyArray<MediaEvaluation>;
  readonly favorites: ReadonlyArray<Favorite>;
  readonly filename: Scalars['String'];
  readonly height: Scalars['Int'];
  readonly mediaTags: ReadonlyArray<MediaTag>;
  readonly parentMedia?: Maybe<Media>;
  readonly parentMediaUuid?: Maybe<Scalars['String']>;
  readonly post: Post;
  readonly postUuid: Scalars['String'];
  readonly ratio: Scalars['Float'];
  readonly s3Bucket: Scalars['String'];
  readonly s3Key: Scalars['String'];
  readonly updatedAt: Scalars['DateTime'];
  readonly uuid: Scalars['String'];
  readonly width: Scalars['Int'];
};

export type MediaAction = {
  readonly __typename?: 'MediaAction';
  readonly action: Action;
  readonly actionUuid: Scalars['String'];
  readonly createdAt: Scalars['DateTime'];
  readonly media: Media;
  readonly mediaUuid: Scalars['String'];
  readonly updatedAt: Scalars['DateTime'];
  readonly uuid: Scalars['String'];
};

export type MediaComment = {
  readonly __typename?: 'MediaComment';
  readonly comment: Comment;
  readonly commentUuid: Scalars['String'];
  readonly createdAt: Scalars['DateTime'];
  readonly media: Media;
  readonly mediaUuid: Scalars['String'];
  readonly updatedAt: Scalars['DateTime'];
  readonly uuid: Scalars['String'];
};

export type MediaEvaluation = {
  readonly __typename?: 'MediaEvaluation';
  readonly createdAt: Scalars['DateTime'];
  readonly evaluation: Evaluation;
  readonly evaluationUuid: Scalars['String'];
  readonly media: Media;
  readonly mediaUuid: Scalars['String'];
  readonly updatedAt: Scalars['DateTime'];
  readonly uuid: Scalars['String'];
};

export type MediaTag = {
  readonly __typename?: 'MediaTag';
  readonly createdAt: Scalars['DateTime'];
  readonly media: Media;
  readonly mediaUuid: Scalars['String'];
  readonly tag: Tag;
  readonly tagEvaluations: ReadonlyArray<TagEvaluation>;
  readonly tagUuid: Scalars['String'];
  readonly updatedAt: Scalars['DateTime'];
  readonly uuid: Scalars['String'];
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  /** コメントに対してアクションを追加する */
  readonly addActionToComment?: Maybe<CommentAction>;
  /** メディアに対してアクションを追加する */
  readonly addActionToMedia?: Maybe<MediaAction>;
  /** コメントのコメントを追加する */
  readonly addCommentToComment?: Maybe<Comment>;
  /** メディアのコメントを追加する */
  readonly addCommentToMedia?: Maybe<MediaComment>;
  /** メディアの評価を追加する */
  readonly addEvaluationToMedia?: Maybe<MediaEvaluation>;
  /** タグの評価を追加する */
  readonly addEvaluationToTag?: Maybe<TagEvaluation>;
  /** メディアをお気に入りに追加する */
  readonly addMediaToFavorites?: Maybe<Favorite>;
  /** メディアにタグを追加する */
  readonly addTagToMedia?: Maybe<MediaTag>;
  readonly changeEmail?: Maybe<Scalars['Boolean']>;
  readonly changePassword?: Maybe<Scalars['Boolean']>;
  readonly changeUserDetail?: Maybe<Scalars['Boolean']>;
  readonly confirmResetPassword?: Maybe<Scalars['Boolean']>;
  readonly confirmSignUp?: Maybe<Scalars['Boolean']>;
  /** 新しいコメントを作成する */
  readonly createComment?: Maybe<Comment>;
  /** 新しいメディアを作成する */
  readonly createMedia?: Maybe<Post>;
  /** 新しいポストを作成する */
  readonly createPost?: Maybe<Post>;
  /** 新しいタグを作成する */
  readonly createTag?: Maybe<Tag>;
  /** 新しいユーザーを作成する */
  readonly createUser?: Maybe<User>;
  /** メディアからお気に入りを削除する */
  readonly removeMediaFromFavorites?: Maybe<Favorite>;
  readonly resendConfirmationCode?: Maybe<Scalars['Boolean']>;
  readonly resetPassword?: Maybe<Scalars['Boolean']>;
  readonly signIn?: Maybe<ResAuthenticationResult>;
  readonly signOut?: Maybe<Scalars['Boolean']>;
  readonly signUp?: Maybe<Scalars['Boolean']>;
  readonly verifyEmail?: Maybe<Scalars['Boolean']>;
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


export type MutationChangeEmailArgs = {
  accessToken: Scalars['String'];
  newEmail?: InputMaybe<Scalars['String']>;
};


export type MutationChangePasswordArgs = {
  accessToken: Scalars['String'];
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationChangeUserDetailArgs = {
  accessToken: Scalars['String'];
  newEmail?: InputMaybe<Scalars['String']>;
};


export type MutationConfirmResetPasswordArgs = {
  code: Scalars['String'];
  email: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationConfirmSignUpArgs = {
  code: Scalars['String'];
  uuid: Scalars['String'];
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
  userUuid: Scalars['String'];
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


export type MutationResendConfirmationCodeArgs = {
  uuid: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationSignInArgs = {
  password: Scalars['String'];
  signInIdentifier: Scalars['String'];
};


export type MutationSignOutArgs = {
  accessToken: Scalars['String'];
};


export type MutationSignUpArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationVerifyEmailArgs = {
  accessToken: Scalars['String'];
  beforeEmail: Scalars['String'];
  code: Scalars['String'];
  newEmail: Scalars['String'];
};

export type Post = {
  readonly __typename?: 'Post';
  readonly content?: Maybe<Scalars['String']>;
  readonly createdAt: Scalars['DateTime'];
  readonly media: ReadonlyArray<Media>;
  readonly title?: Maybe<Scalars['String']>;
  readonly updatedAt: Scalars['DateTime'];
  readonly user: User;
  readonly userUuid: Scalars['String'];
  readonly uuid: Scalars['String'];
};

export type Query = {
  readonly __typename?: 'Query';
  /** 複数のコメントを取得する */
  readonly comments: ReadonlyArray<Comment>;
  /** 特定のメディアを取得する */
  readonly media?: Maybe<Media>;
  /** ポストの一覧を取得する */
  readonly posts: ReadonlyArray<Post>;
  /** 複数のタグを取得する */
  readonly tags: ReadonlyArray<Tag>;
  /** 特定のユーザーを取得する */
  readonly user?: Maybe<User>;
};


export type QueryCommentsArgs = {
  mediaUuid: Scalars['String'];
};


export type QueryMediaArgs = {
  uuid: Scalars['String'];
};


export type QueryTagsArgs = {
  uuids: ReadonlyArray<Scalars['String']>;
};


export type QueryUserArgs = {
  uuid: Scalars['String'];
};

export type ResAuthenticationResult = {
  readonly __typename?: 'ResAuthenticationResult';
  readonly accessToken?: Maybe<Scalars['String']>;
  readonly expiresIn?: Maybe<Scalars['Int']>;
  readonly idToken?: Maybe<Scalars['String']>;
  readonly newDeviceMetadata?: Maybe<Scalars['String']>;
  readonly refreshToken?: Maybe<Scalars['String']>;
  readonly tokenType?: Maybe<Scalars['String']>;
};

export type ResMedia = {
  readonly __typename?: 'ResMedia';
  readonly createdAt: Scalars['String'];
  readonly type: Scalars['String'];
  readonly updatedAt: Scalars['String'];
  readonly url: Scalars['String'];
  readonly uuid: Scalars['String'];
};

export type Tag = {
  readonly __typename?: 'Tag';
  readonly createdAt: Scalars['DateTime'];
  readonly mediaTags: ReadonlyArray<MediaTag>;
  readonly name: Scalars['String'];
  readonly tagEvaluations: ReadonlyArray<TagEvaluation>;
  readonly updatedAt: Scalars['DateTime'];
  readonly user: User;
  readonly userUuid: Scalars['String'];
  readonly uuid: Scalars['String'];
};

export type TagEvaluation = {
  readonly __typename?: 'TagEvaluation';
  readonly createdAt: Scalars['DateTime'];
  readonly evaluation: Evaluation;
  readonly evaluationUuid: Scalars['String'];
  readonly mediaTag?: Maybe<MediaTag>;
  readonly tag: Tag;
  readonly tagUuid: Scalars['String'];
  readonly updatedAt: Scalars['DateTime'];
  readonly uuid: Scalars['String'];
};

export type User = {
  readonly __typename?: 'User';
  readonly comments: ReadonlyArray<Comment>;
  readonly createdAt: Scalars['DateTime'];
  readonly evaluations: ReadonlyArray<Evaluation>;
  readonly favorites: ReadonlyArray<Favorite>;
  readonly mediaActions: ReadonlyArray<Action>;
  readonly posts: ReadonlyArray<Post>;
  readonly tags: ReadonlyArray<Tag>;
  readonly updatedAt: Scalars['DateTime'];
  readonly username: Scalars['String'];
  readonly uuid: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Action: ResolverTypeWrapper<Action>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<Comment>;
  CommentAction: ResolverTypeWrapper<CommentAction>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Evaluation: ResolverTypeWrapper<Evaluation>;
  Favorite: ResolverTypeWrapper<Favorite>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Media: ResolverTypeWrapper<Media>;
  MediaAction: ResolverTypeWrapper<MediaAction>;
  MediaComment: ResolverTypeWrapper<MediaComment>;
  MediaEvaluation: ResolverTypeWrapper<MediaEvaluation>;
  MediaTag: ResolverTypeWrapper<MediaTag>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  Query: ResolverTypeWrapper<{}>;
  ResAuthenticationResult: ResolverTypeWrapper<ResAuthenticationResult>;
  ResMedia: ResolverTypeWrapper<ResMedia>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Tag: ResolverTypeWrapper<Tag>;
  TagEvaluation: ResolverTypeWrapper<TagEvaluation>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Action: Action;
  Boolean: Scalars['Boolean'];
  Comment: Comment;
  CommentAction: CommentAction;
  DateTime: Scalars['DateTime'];
  Evaluation: Evaluation;
  Favorite: Favorite;
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  Media: Media;
  MediaAction: MediaAction;
  MediaComment: MediaComment;
  MediaEvaluation: MediaEvaluation;
  MediaTag: MediaTag;
  Mutation: {};
  Post: Post;
  Query: {};
  ResAuthenticationResult: ResAuthenticationResult;
  ResMedia: ResMedia;
  String: Scalars['String'];
  Tag: Tag;
  TagEvaluation: TagEvaluation;
  Upload: Scalars['Upload'];
  User: User;
};

export type ActionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Action'] = ResolversParentTypes['Action']> = {
  commentAction?: Resolver<ReadonlyArray<ResolversTypes['CommentAction']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  mediaActions?: Resolver<ReadonlyArray<ResolversTypes['MediaAction']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  commentActions?: Resolver<ReadonlyArray<ResolversTypes['CommentAction']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  mediaComments?: Resolver<ReadonlyArray<ResolversTypes['MediaComment']>, ParentType, ContextType>;
  mediaUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentActionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentAction'] = ResolversParentTypes['CommentAction']> = {
  action?: Resolver<ResolversTypes['Action'], ParentType, ContextType>;
  actionUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  comment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>;
  commentUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EvaluationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Evaluation'] = ResolversParentTypes['Evaluation']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  mediaEvaluations?: Resolver<ReadonlyArray<ResolversTypes['MediaEvaluation']>, ParentType, ContextType>;
  tagEvaluations?: Resolver<ReadonlyArray<ResolversTypes['TagEvaluation']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FavoriteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Favorite'] = ResolversParentTypes['Favorite']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  media?: Resolver<ResolversTypes['Media'], ParentType, ContextType>;
  mediaUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Media'] = ResolversParentTypes['Media']> = {
  actions?: Resolver<ReadonlyArray<ResolversTypes['MediaAction']>, ParentType, ContextType>;
  childMedias?: Resolver<ReadonlyArray<ResolversTypes['Media']>, ParentType, ContextType>;
  comments?: Resolver<ReadonlyArray<ResolversTypes['MediaComment']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  evaluations?: Resolver<ReadonlyArray<ResolversTypes['MediaEvaluation']>, ParentType, ContextType>;
  favorites?: Resolver<ReadonlyArray<ResolversTypes['Favorite']>, ParentType, ContextType>;
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  mediaTags?: Resolver<ReadonlyArray<ResolversTypes['MediaTag']>, ParentType, ContextType>;
  parentMedia?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType>;
  parentMediaUuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  postUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ratio?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  s3Bucket?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  s3Key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaActionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaAction'] = ResolversParentTypes['MediaAction']> = {
  action?: Resolver<ResolversTypes['Action'], ParentType, ContextType>;
  actionUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  media?: Resolver<ResolversTypes['Media'], ParentType, ContextType>;
  mediaUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaCommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaComment'] = ResolversParentTypes['MediaComment']> = {
  comment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>;
  commentUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  media?: Resolver<ResolversTypes['Media'], ParentType, ContextType>;
  mediaUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaEvaluationResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaEvaluation'] = ResolversParentTypes['MediaEvaluation']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  evaluation?: Resolver<ResolversTypes['Evaluation'], ParentType, ContextType>;
  evaluationUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  media?: Resolver<ResolversTypes['Media'], ParentType, ContextType>;
  mediaUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaTag'] = ResolversParentTypes['MediaTag']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  media?: Resolver<ResolversTypes['Media'], ParentType, ContextType>;
  mediaUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType>;
  tagEvaluations?: Resolver<ReadonlyArray<ResolversTypes['TagEvaluation']>, ParentType, ContextType>;
  tagUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addActionToComment?: Resolver<Maybe<ResolversTypes['CommentAction']>, ParentType, ContextType, RequireFields<MutationAddActionToCommentArgs, 'actionType' | 'commentUuid' | 'userUuid'>>;
  addActionToMedia?: Resolver<Maybe<ResolversTypes['MediaAction']>, ParentType, ContextType, RequireFields<MutationAddActionToMediaArgs, 'actionType' | 'mediaUuid' | 'userUuid'>>;
  addCommentToComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<MutationAddCommentToCommentArgs, 'commentUuid' | 'content' | 'userUuid'>>;
  addCommentToMedia?: Resolver<Maybe<ResolversTypes['MediaComment']>, ParentType, ContextType, RequireFields<MutationAddCommentToMediaArgs, 'content' | 'mediaUuid' | 'userUuid'>>;
  addEvaluationToMedia?: Resolver<Maybe<ResolversTypes['MediaEvaluation']>, ParentType, ContextType, RequireFields<MutationAddEvaluationToMediaArgs, 'evaluationUuid' | 'mediaUuid' | 'userUuid'>>;
  addEvaluationToTag?: Resolver<Maybe<ResolversTypes['TagEvaluation']>, ParentType, ContextType, RequireFields<MutationAddEvaluationToTagArgs, 'evaluationUuid' | 'tagUuid' | 'userUuid'>>;
  addMediaToFavorites?: Resolver<Maybe<ResolversTypes['Favorite']>, ParentType, ContextType, RequireFields<MutationAddMediaToFavoritesArgs, 'mediaUuid' | 'userUuid'>>;
  addTagToMedia?: Resolver<Maybe<ResolversTypes['MediaTag']>, ParentType, ContextType, RequireFields<MutationAddTagToMediaArgs, 'mediaUuid' | 'tagUuid' | 'userUuid'>>;
  changeEmail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationChangeEmailArgs, 'accessToken'>>;
  changePassword?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'accessToken' | 'newPassword' | 'oldPassword'>>;
  changeUserDetail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationChangeUserDetailArgs, 'accessToken'>>;
  confirmResetPassword?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationConfirmResetPasswordArgs, 'code' | 'email' | 'newPassword'>>;
  confirmSignUp?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationConfirmSignUpArgs, 'code' | 'uuid'>>;
  createComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'content' | 'mediaUuid' | 'userUuid'>>;
  createMedia?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationCreateMediaArgs, 'contentType' | 'file' | 'filename' | 'height' | 'ratio' | 'userUuid' | 'width'>>;
  createPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'userUuid'>>;
  createTag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<MutationCreateTagArgs, 'name' | 'userUuid'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'username'>>;
  removeMediaFromFavorites?: Resolver<Maybe<ResolversTypes['Favorite']>, ParentType, ContextType, RequireFields<MutationRemoveMediaFromFavoritesArgs, 'favoriteUuid'>>;
  resendConfirmationCode?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationResendConfirmationCodeArgs, 'uuid'>>;
  resetPassword?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'email'>>;
  signIn?: Resolver<Maybe<ResolversTypes['ResAuthenticationResult']>, ParentType, ContextType, RequireFields<MutationSignInArgs, 'password' | 'signInIdentifier'>>;
  signOut?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSignOutArgs, 'accessToken'>>;
  signUp?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSignUpArgs, 'email' | 'password' | 'username'>>;
  verifyEmail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationVerifyEmailArgs, 'accessToken' | 'beforeEmail' | 'code' | 'newEmail'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  media?: Resolver<ReadonlyArray<ResolversTypes['Media']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  comments?: Resolver<ReadonlyArray<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QueryCommentsArgs, 'mediaUuid'>>;
  media?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType, RequireFields<QueryMediaArgs, 'uuid'>>;
  posts?: Resolver<ReadonlyArray<ResolversTypes['Post']>, ParentType, ContextType>;
  tags?: Resolver<ReadonlyArray<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagsArgs, 'uuids'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'uuid'>>;
};

export type ResAuthenticationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResAuthenticationResult'] = ResolversParentTypes['ResAuthenticationResult']> = {
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expiresIn?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  idToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newDeviceMetadata?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokenType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResMediaResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMedia'] = ResolversParentTypes['ResMedia']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  mediaTags?: Resolver<ReadonlyArray<ResolversTypes['MediaTag']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tagEvaluations?: Resolver<ReadonlyArray<ResolversTypes['TagEvaluation']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagEvaluationResolvers<ContextType = any, ParentType extends ResolversParentTypes['TagEvaluation'] = ResolversParentTypes['TagEvaluation']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  evaluation?: Resolver<ResolversTypes['Evaluation'], ParentType, ContextType>;
  evaluationUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mediaTag?: Resolver<Maybe<ResolversTypes['MediaTag']>, ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType>;
  tagUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  comments?: Resolver<ReadonlyArray<ResolversTypes['Comment']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  evaluations?: Resolver<ReadonlyArray<ResolversTypes['Evaluation']>, ParentType, ContextType>;
  favorites?: Resolver<ReadonlyArray<ResolversTypes['Favorite']>, ParentType, ContextType>;
  mediaActions?: Resolver<ReadonlyArray<ResolversTypes['Action']>, ParentType, ContextType>;
  posts?: Resolver<ReadonlyArray<ResolversTypes['Post']>, ParentType, ContextType>;
  tags?: Resolver<ReadonlyArray<ResolversTypes['Tag']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Action?: ActionResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  CommentAction?: CommentActionResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Evaluation?: EvaluationResolvers<ContextType>;
  Favorite?: FavoriteResolvers<ContextType>;
  Media?: MediaResolvers<ContextType>;
  MediaAction?: MediaActionResolvers<ContextType>;
  MediaComment?: MediaCommentResolvers<ContextType>;
  MediaEvaluation?: MediaEvaluationResolvers<ContextType>;
  MediaTag?: MediaTagResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResAuthenticationResult?: ResAuthenticationResultResolvers<ContextType>;
  ResMedia?: ResMediaResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  TagEvaluation?: TagEvaluationResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};

