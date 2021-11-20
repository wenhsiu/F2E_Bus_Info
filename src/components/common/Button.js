import { Button as MuiButton } from '@material-ui/core';
// import { createStyles, makeStyles } from '@material-ui/styles';

// const useStyle = makeStyles((theme) => createStyles({}));

const Button = ({ label, ...props }) => {
  return (
    <MuiButton variant="contained" color="secondary" {...props}>
      {label}
    </MuiButton>
  );
};

export default Button;
