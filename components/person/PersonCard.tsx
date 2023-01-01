import BaseImage from '../common/BaseImage';
import BaseCard from '../common/BaseCard';
import BaseCardHeader from '../common/BaseCardHeader';

import useApiConfiguration from '../../hooks/useApiConfiguration';
import { Person } from '../../shared/types/personTypes';

interface PersonCardProps {
  person: Person;
}

function PersonCard({ person }: PersonCardProps) {
  const { getImageUrl } = useApiConfiguration();

  return (
    <BaseCard href={`/person/${person.id}`}>
      <BaseImage
        src={getImageUrl(person.profile_path)}
        alt={person.name}
        width={2}
        height={3}
        layout="responsive"
        objectFit="cover"
      />
      <BaseCardHeader title={person.name} />
    </BaseCard>
  );
}

export default PersonCard;
