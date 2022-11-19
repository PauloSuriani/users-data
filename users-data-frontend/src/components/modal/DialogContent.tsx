import { Button } from "@mui/material";
import React from "react";
import { DialogPropTypes } from "./types";
import WithDialog from "./WithDialog";
import DialogContent from "./DialogContent";

class MyComponent extends React.Component<DialogPropTypes> {
  private handleDialogOkClick = () => {
    alert("Dialog Ok button clicked!");
  };

  private handleDialogCancellClick = () => {
    this.props.closeDialog();
  };

  private handleButtonClick = () => {
    const component = <DialogContent />;
    this.props.openDialog({
      component,
      title: "My Dialog Title",
      okCallback: this.handleDialogOkClick,
      cancelCallback: this.handleDialogCancellClick,
      width: "lg",
      okText: "OK",
      cancelText: "Cancel"
    });
  };

  render() {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleButtonClick}
        >
          Open Dialog
        </Button>
      </div>
    );
  }
}

export default WithDialog(MyComponent);