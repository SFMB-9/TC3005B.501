import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: (props) => ({
    borderRadius: "14px",
    fontFamily: "Lato",
    textTransform: "none",
    backgroundColor: props.initiallyTransparent
      ? "transparent"
      : "rgba(255,255,255,0.1)",
    "&:hover": {
      backgroundColor: props.hoverColor,
    },
    "&:disabled": {
      cursor: "not-allowed",
    },
  }),
}));

const SwivelButton = ({
  children,
  href,
  hoverColor,
  initiallyTransparent = false,
  disabled,
  ...props
}) => {
  const classes = useStyles({ hoverColor, initiallyTransparent });
  return (
    <a href={disabled ? "javascript:void(0)" : href}>
      <Button
        {...props}
        variant="contained"
        disableElevation
        className={classes.button}
        disabled={disabled}
        component="span"
      >
        {children}
      </Button>
    </a>
  );
};

export default SwivelButton;