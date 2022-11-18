import { NextSeo, ArticleJsonLd, DefaultSeo } from "next-seo";

const SiteConfig = {
  title: "Cuzz's Log",
  description: "Cuzz의 기술 블로그 겸 일기장",
  author: {
    name: "cuzz",
  },
};

export const CommonSeo = () => (
  <DefaultSeo
    title={SiteConfig.title}
    description={SiteConfig.description}
    openGraph={{
      type: "website",
      locale: "ko-KR",
      url: "/",
      title: SiteConfig.title,
      description: SiteConfig.description,
      images: [{ alt: "Cuzz's Log", url: "/image/thumbnail.png" }],
    }}
    additionalMetaTags={[
      {
        name: "author",
        content: SiteConfig.author.name,
      },
    ]}
  ></DefaultSeo>
);

export const PageSeo = ({ title, description, url }: { title: string; description: string; url: string }) => {
  return (
    <NextSeo
      title={`${title} – ${SiteConfig.title}`}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title,
        description,
        images: [{ alt: title, url: "/image/thumbnail.png" }],
      }}
    />
  );
};

export const IntroLD = () => {
  return (
    <ArticleJsonLd
      authorName={"Cuzz"}
      datePublished={"2022-09-30"}
      description={"개발자 Cuzz의 개발 일지 겸 개발 블로그"}
      publisherName={"Cuzz"}
      title={"Cuzz's Log"}
      images={[]}
      url=""
      publisherLogo={`/image/common/MyLogo.png`}
    />
  );
};

export const BlogSeo = ({
  title,
  summary,
  date,
  url,
  tags,
}: {
  title: string;
  summary: string;
  date: string;
  url: string;
  tags: string[];
}) => {
  const publishedAt = new Date(date).toISOString();

  return (
    <>
      <NextSeo
        title={`${title} – ${SiteConfig.title}`}
        description={summary}
        canonical={url}
        openGraph={{
          type: "article",
          article: {
            publishedTime: publishedAt,
            authors: [`/about`],
            tags,
          },
          url,
          title,
          description: summary,
          images: [{ alt: title, url: "/image/thumbnail.png" }],
        }}
      />
      <ArticleJsonLd
        authorName={SiteConfig.author.name}
        datePublished={publishedAt}
        description={summary}
        publisherName={SiteConfig.author.name}
        title={title}
        images={[]}
        url={url}
        publisherLogo={`/image/common/MyLogo.png`}
      />
    </>
  );
};
