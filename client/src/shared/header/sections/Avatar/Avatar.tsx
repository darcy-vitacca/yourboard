import { FC } from 'react';
import { Markdown } from '../../../markdown';
import { AvatarContainer } from './Avatar.styles';

interface IAvatarProps {
  initials: string;
}
export const Avatar: FC<IAvatarProps> = ({ initials }) => {
  return (
    <AvatarContainer>
      <Markdown children={initials} className="avatar-text" />
    </AvatarContainer>
  );
};
