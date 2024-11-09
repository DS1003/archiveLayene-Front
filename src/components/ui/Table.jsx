import React from 'react';

// Table Component
const Table = ({ children }) => {
  return <table className="table">{children}</table>;
};

// TableHead Component
const TableHead = ({ children }) => {
  return <thead className="table-head">{children}</thead>;
};

// TableBody Component
const TableBody = ({ children }) => {
  return <tbody className="table-body">{children}</tbody>;
};

// TableRow Component
const TableRow = ({ children }) => {
  return <tr className="table-row">{children}</tr>;
};

// TableCell Component
const TableCell = ({ children, header }) => {
  return header ? (
    <th className="table-cell">{children}</th>
  ) : (
    <td className="table-cell">{children}</td>
  );
};

// TableHeader Component
const TableHeader = ({ children }) => {
  return <th className="table-header">{children}</th>;
};

export { Table, TableHead, TableBody, TableRow, TableCell, TableHeader };
