import Link from "next/link";
import { client } from "@/libs/client";
import { Blog } from "@/types/blog";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

import styles from "@/styles/Post.module.css";
import Image from "next/image";

type Props = {
  blog: Blog[];
};

const Posts: React.FC<Props> = ({ blog }) => {
    return (
      <div>
        <div className={styles.posts}>
          <ul className={styles.grid}>
            {blog.map((blog) => (
              <li key={blog.id}>
                <Link href={`/blog/${blog.id}`}>
                  <Image
                    className={styles.eyecatch_img}
                    src={blog.eyecatch.url}
                    width={300}
                    height={175}
                    alt={blog.title}
                  />
                  <h5 className={styles.blogtitle}>{blog.title}</h5>
                  <p className={styles.publishedAt}>
                    投稿日：
                    {dayjs
                      .utc(blog.publishedAt)
                      .tz("Asia/Tokyo")
                      .format(
                        "YYYY" +
                          "年" +
                          "MM" +
                          "月" +
                          "DD" +
                          "日" +
                          "hh" +
                          ":" +
                          "mm"
                      )}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default Posts;
  
  // データをテンプレートに受け渡す部分の処理を記述します
  export const getStaticProps = async () => {
    const data = await client.get({ endpoint: "blogs" });
  
    return {
      props: {
        blog: data.contents,
      },
    };
  };