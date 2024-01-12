const ErrorAlertMessage = ({ messageApi }) => {
  messageApi.open({
    type: "success",
    content: "This is a prompt message with custom className and style",
    className: "custom-class",
    style: {
      marginTop: "20vh",
    },
  });
};

export default ErrorAlertMessage;
