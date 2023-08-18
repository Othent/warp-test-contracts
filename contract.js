export function handle(state, action) {
  
  const contractInput = action.input


  // ignore author, anyone can make a post
  if (contractInput.function === 'initializeContract') {
  }


  // add post
  if (contractInput.function === 'createPost') {
    const current_blog_posts = state.posts
    current_blog_posts.push(contractInput.txnData)
    state.posts = current_blog_posts
  }


  // add post
  if (contractInput.function === 'broadcastTxn') {
    const current_blog_posts = state.posts
    current_blog_posts.push(contractInput.txnData)
    state.posts = current_blog_posts
  }


  return { state };
}

