import { useCallback, useEffect, useState } from "react";
import { DisplayFile } from "../../types";
import { parse } from "csv-parse/browser/esm";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { grey, blue } from "@mui/material/colors";

const Table = styled.table`
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  display: "flex";
  justify-content: "space-between";
  width: 100%;
`;

const TableRow = styled.tr``;

const TableCellStyle = (props: any) =>
  css`
    flex: ${props.flex};
    max-width: ${props.maxWidth};
  `;
//TODO: text align right for rtl langs
const TD = styled.td`
  ${TableCellStyle};
  text-align: left;
  padding-right: 1rem;
  border-bottom: 1px solid ${grey[300]};
  margin: 1rem 0;
`;

const TableCell: React.FC<{ children: string }> = ({ children }) => {
  return (
    <TD>
      {children.split(" ").map((value, idx) =>
        /http/.test(value) ? (
          <a
            style={{ color: blue[500] }}
            href={value}
            key={idx}
            target="_blank"
            rel="noreferrer"
          >
            {value}
          </a>
        ) : (
          value
        )
      )}
    </TD>
  );
};

interface Props {
  file: DisplayFile;
}

const CsvFile: React.FC<Props> = ({ file }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<string[][]>();
  const [colWidths, setColWidths] = useState<number[]>([]);

  useEffect(() => {
    fetch(file.fileData)
      .then((d) => d.arrayBuffer())
      .then((buf) => {
        const decoder = new TextDecoder();
        parse(decoder.decode(buf), {}, (err, rows) => {
          if (err) setIsError(true);
          if (rows) setData(rows);
          setIsLoading(false);
        });
      });
  }, [file.fileData]);
  const calculateColWidths = useCallback(() => {
    if (data) {
      const widths = Array(data[0].length).fill(0);
      data.forEach((row) => {
        row.forEach((value, idx) => {
          widths[idx] += value.length;
        });
      });
      setColWidths(widths.map((total) => Math.round(total / data.length)));
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener("resize", (e) => calculateColWidths());
    return () => {
      window.removeEventListener("resize", (e) => calculateColWidths());
    };
  }, [calculateColWidths]);

  if (isLoading) return <CircularProgress color="warning" />;
  if (isError)
    return (
      <Typography variant="h6" color="red">
        An Error Occurred while loading {file.metaData?.fileName ?? "the file"}
      </Typography>
    );
  return (
    <Box
      maxWidth={window.innerWidth - 200}
      overflow="auto"
      padding="1rem"
      borderRadius="1rem"
      sx={{ backgroundColor: grey[50] }}
      color={grey[900]}
    >
      <Table>
        <TableHeader>
          <TableRow>
            {data &&
              data[0].map((columnHeader, idx) => (
                <TD key={columnHeader}>{columnHeader}</TD>
              ))}
          </TableRow>
        </TableHeader>
        <tbody>
          {data &&
            data.slice(1).map((row, idx) => (
              <TableRow key={idx}>
                {row.map((value, idx) => (
                  <TableCell key={idx}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default CsvFile;
