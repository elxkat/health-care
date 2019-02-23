import {ResultItem} from "../../redux/healthCareReducer";
import * as React from "react";
import {ResultView} from "./resultView";
import ReactPaginate from 'react-paginate';
import styles from './results.module.scss';

export interface ResultsProps {
  results: ResultItem[];
}

const pageSize = 20;

export const Results: React.FunctionComponent<ResultsProps> = (props) => {

  const { results } = props;
  const [page, setPage] = React.useState(0);
  const pageIndex = page * pageSize;
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {results.slice(pageIndex, pageIndex + 100).map((item) => <ResultView key={item["DRG Definition"] + item["Provider Id"]} item={item} />)}
      </div>
      <ReactPaginate
        onPageChange={(selectedItem) => setPage(selectedItem.selected)}
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        activeLinkClassName={styles.pageLink}
        pageClassName={styles.page}
        pageCount={results.length / pageSize}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        containerClassName={styles.pagination}
        activeClassName={styles.activePage}
      />
    </div>
  );
};