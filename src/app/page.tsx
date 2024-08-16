import Post from "./posts/page";

export default async function Home() {
  return (
    <section>
      <Post limit={3} />
    </section>
  );
}
