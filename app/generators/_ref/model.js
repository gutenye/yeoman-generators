import { sequelize, resolver, t, a} from './sequelize'
// BOOLEAN INTEGER STRING TEXT DATE DATEONLY ENUM(a,..) ARRAY(TEXT) VIRTUAL

export const Post = sequelize.define('post', {
  count: { type: t.STRING, unique: true, allowNull: false, defaultValue: 0 }, // needs allowNull or defaultValue
  type: { type: t.ENUM('json', 'strings') }
  slug: { unique: 'slug-userId' }, userId: { unique: 'slug-userId' }
}, {
  tableName: 'post'
})

// JoinPostTag.js
const JoinPostTag = sequelize.define('join_post_tag', {
  postId: { type: INTEGER },
  tagId: { type: INTEGER },
}, {
  timestamps: false
})

const { Comment } = require('./Comment')
Post.Comments = Post.hasMany(Comment, {as: 'posts', foreignKey: 'userId'})
Post.Post = Post.belongsTo(Post, {as: 'user', forgienKey: 'userId'})
Post.Tags = Post.belongsToMany(Tag, {through: {model: PostTag}})

Post.Type = {
  typeDef: `
    type Post {
      id: ID!
      title: String Int Boolean
      comments(limit: Int = 10): [Comment]
    }

    type PostConn {
      nodes: [Post]
      totalCount: Int
    }
  `,
  resolver: {
    Post: {
      posts: resolver(Post.Comments),
      post(user, args, context) {
        return Comment.findOne({where: {title, userId: user.id}})
      },
    }
  }
}

Post.Query = {
  typeDef: `
    post(id: ID!): Post                        // must have !, otherwise post() without id returns first findOne
    posts(q: String, orderBy: String, page: Int, limit: Int): PostConn
  `,
  resolver: {
    post: resolver(Post),
    posts: resolver(Post, (query, {q}) => {
      if (q)
        return {...query, where: {$or: [{description: {$iLike: `%${q}%`}}]}}
      return query
    }),
  }
}

Post.Mutation = {
  typeDef: `
    createPost(input: CreatePostInput): Post
    updatePost(id: ID!, input: UpdatePostInput): Post
    deletePost(id: ID!): Post
  `,
  extraDef: `
    input CreatePostInput {
      title: String!
    }

    input UpdatePostInput {
      title: String
    }
  `,
  resolver: {
    createPost(_, {input}, {user}) {
      return Post.create({...input, userId: user.id})
    },
    updatePost(_, {id, input}) {
      return Post.update(input, {where: {id}, returning: true}).then(v => v[0][1])
    },
    deletePost(_, {id}) {
      return Post.destroy({where: {id}})
    },
  }
}

Post.Subscription = {
  typeDef: `
    counter: Int
  `,
  resolver: {
    counter: (value) => value
  }
}
