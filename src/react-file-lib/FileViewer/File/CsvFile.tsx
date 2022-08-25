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

//TODO: text align right for rtl langs
const TD = styled.td<{ bgColor?: string }>`
  background-color: ${(props) => props.bgColor ?? "white"};
  min-width: 10rem;
  text-align: left;
  padding: 0 0.5rem 0 2px;
  border: 1px solid ${grey[300]};
  margin: 1rem 0;
`;

const TableCell: React.FC<{ children: string }> = ({ children }) => {
  return (
    <TD>
      <Typography variant="body2">
        {children
          .split(" ")
          .reduce<(string | JSX.Element)[]>((acc, value, idx) => {
            if (/http/.test(value)) {
              return [
                ...acc,
                <a
                  style={{ color: blue[500] }}
                  href={value}
                  key={idx}
                  target="_blank"
                  rel="noreferrer"
                >
                  {value}
                </a>,
              ];
            } else {
              if (
                typeof acc[acc.length - 1] === "string" ||
                typeof acc[acc.length - 1] === "number"
              ) {
                return [
                  ...acc.slice(0, acc.length - 1),
                  acc[acc.length - 1] + " " + value,
                ];
              }
              return [...acc, value];
            }
          }, [])}
      </Typography>
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

  if (isLoading) return <CircularProgress color="info" />;
  if (isError)
    return (
      <Typography variant="h6" color="red">
        An Error Occurred while loading {file.metaData?.fileName ?? "the file"}
      </Typography>
    );
  return (
    <Box
      maxWidth={Math.max(768, window.innerWidth - 200)}
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
                <TD key={idx} bgColor={grey[400]}>
                  {columnHeader}
                </TD>
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
