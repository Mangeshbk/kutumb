import QuoteList from "@/components/quoteList";
import "./page.css";
import PageWrapper from "@/components/wrapper/pageWrapper";

export default function Home() {
  return (
    <main>
      <PageWrapper>
        <QuoteList />
      </PageWrapper>
    </main>
  );
}
