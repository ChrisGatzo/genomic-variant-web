import React from 'react';
import PropTypes from 'prop-types';
import styles from './gene-list.css';
import ExpandingColumn from '../expanding-column/expanding-column';

export default function GeneList({ genes }) {
  const renderProp = value => value || '-';

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Gene</th>
            <th>Nucleotide Change</th>
            <th>Protein Change</th>
            <th>Alias</th>
            <th>Region</th>
            <th>Reported Classification</th>
            <th>Last Evaluated</th>
            <th>Last Updated</th>
            <th>More Info</th>
          </tr>
        </thead>
        <tbody>
          {genes.length === 0 && (
            <tr>
              <td colSpan="9" className={styles.noResults}>
                No Results
              </td>
            </tr>
          )}
          {genes.map((g, i) => (
            <tr key={i}>
              <td>{renderProp(g.gene)}</td>
              <td>
                <ExpandingColumn values={g.otherMappings} />
              </td>
              <td>{renderProp(g.proteinChange)}</td>
              <td>{renderProp(g.alias)}</td>
              <td>{renderProp(g.region)}</td>
              <td>{renderProp(g.reportedClassification)}</td>
              <td>{renderProp(g.lastEvaluated)}</td>
              <td>{renderProp(g.lastUpdated)}</td>
              <td>
                <a href={g.url} target="_blank">
                  {g.source}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

GeneList.propTypes = {
  genes: PropTypes.array,
};

GeneList.defaultProps = {
  genes: [],
};
