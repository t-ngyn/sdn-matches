import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export interface IOutcomeProps {
  foundResult: boolean;
}

export function Outcome(props: IOutcomeProps) {
  if (props.foundResult) {
    return <CheckCircleIcon style={{ color: "green" }} />;
  }

  return <CancelIcon style={{ color: "red" }} />;
}
