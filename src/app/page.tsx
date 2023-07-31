import Header from "@/components/myui/Header";
import PostFeed from "@/components/posts/PostFeed";
import PostForm from "@/components/posts/PostForm";

export default function Home() {
  return (
    <div>
      <Header title="Home" />
      <PostForm placeholder="Tweet" />
      <PostFeed />
    </div>
  );
}
