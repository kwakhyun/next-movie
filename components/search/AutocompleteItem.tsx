import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemProps,
  styled,
  ListItemButton,
  ListItem,
} from '@mui/material';

import useApiConfiguration from '../../hooks/useApiConfiguration';

import { Maybe } from '../../shared/types/commonTypes';

const StyledListItemText = styled(ListItemText)({
  '.MuiListItemText-secondary': {
    wordBreak: 'break-word',
  },
});

export type AutocompleteItemProps<C extends React.ElementType = 'li'> =
  ListItemProps<
    C,
    {
      component?: C;
      avatarUrl: string;
      primaryText: string;
      secondaryText?: Maybe<string>;
    }
  >;

function AutocompleteItem<C extends React.ElementType>({
  avatarUrl,
  primaryText,
  secondaryText,
  ...rest
}: AutocompleteItemProps<C>) {
  const { getImageUrl } = useApiConfiguration();

  return (
    <ListItem disablePadding>
      <ListItemButton dense sx={{ alignItems: 'flex-start' }} {...rest}>
        <ListItemAvatar>
          <Avatar src={getImageUrl(avatarUrl)} alt={'Avatar'} />
        </ListItemAvatar>
        <StyledListItemText primary={primaryText} secondary={secondaryText} />
      </ListItemButton>
    </ListItem>
  );
}

export default AutocompleteItem;
