import React from 'react';
import PropTypes from 'prop-types';
import styles from './gene-list.css';

export default function GeneList({ genes }) {
  const renderProp = value => value || '-';

  return (
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
        {genes.map((g, i) => (
          <tr key={i}>
            <td>{renderProp(g.gene)}</td>
            <td>
              {g.otherMappings &&
                g.otherMappings.split(',').map((n, j) => (
                  <p key={j} className={styles.otherMappings}>
                    {n}
                  </p>
                ))}
            </td>
            <td>{renderProp(g.proteinChange)}</td>
            <td>{renderProp(g.alias)}</td>
            <td>{renderProp(g.region)}</td>
            <td>{renderProp(g.reportedClassification)}</td>
            <td>{renderProp(g.lastEvaluated)}</td>
            <td>{renderProp(g.lastUpdated)}</td>
            <td>
              <a href={g.url}>{g.source}</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

GeneList.propTypes = {
  genes: PropTypes.array,
};
