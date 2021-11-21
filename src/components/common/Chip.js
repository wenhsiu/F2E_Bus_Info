import { Chip as MuiChip } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: theme.colors.perano,
    },
  })
);

const Chip = ({ ...props }) => {
  const style = useStyle();

  return <MuiChip classes={{ root: style.root }} {...props} />;
};

export default Chip;
