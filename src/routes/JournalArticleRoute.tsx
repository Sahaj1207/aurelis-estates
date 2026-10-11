import React from "react";
import { JournalArticlePage } from "../components/journalArticle";
import { journalArticlesMap, monolithicStoneArticle } from "../data/journalArticlesData";

interface JournalArticleRouteProps {
  slug: string;
  onNavigate: (path: string) => void;
  onBack: () => void;
}

const JournalArticleRoute: React.FC<JournalArticleRouteProps> = ({
  slug,
  onNavigate,
  onBack,
}) => {
  const article = journalArticlesMap[slug] ?? monolithicStoneArticle;
  return <JournalArticlePage article={article} onNavigate={onNavigate} onBack={onBack} />;
};

export default JournalArticleRoute;
