import { client } from "@/libs/client";
import { Blog } from "@/types/blog";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
import styles from "@/styles/Blogid.module.css";

type Props = {
  blog: Blog[];
};

const BlogId: React.FC<Props> = ({ blog }: any) => {
  return (
    <main>
      <div>
        <h1 className={styles.title}>{blog.title}</h1>
        <p className={styles.publishedAt}>
          投稿日：
          {dayjs
            .utc(blog.publishedAt)
            .tz("Asia/Tokyo")
            .format(
              "YYYY" + "年" + "MM" + "月" + "DD" + "日" + "hh" + ":" + "mm"
            )}
        </p>
        <p className={styles.category}>
          タグ：{blog.category && `${blog.category.name}`}
        </p>

        <div
          className={styles.post}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>{" "}
    </main>
  );
};

export default BlogId;

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" });

  const paths = data.contents.map(
    (content: { id: string }) => `/blog/${content.id}`
  );
  return { paths, fallback: false };
};

export const getStaticProps = async (context: { params: { id: string } }) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};