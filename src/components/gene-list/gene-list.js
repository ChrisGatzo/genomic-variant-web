import React from 'react';

export default function GeneList({ genes }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Header 1</th>
        </tr>
      </thead>
      <tbody>
        {genes.map(g => (
          <tr>
            <td>{g.gene}</td>
            <td>{g.source}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
