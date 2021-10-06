import { Button } from "@mui/material";

export default function Dashboard(props) {
  return <Button onClick={() => props.signOut}>logout </Button>;
}
