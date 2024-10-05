import { FC } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useMutation, useQueryClient } from 'react-query'; // Исправлен импорт
import { useProfile } from '@/hooks/useProfile';
import { UserService } from '@/services/product/user.service';


const FavoriteButton: FC<{ productId: number }> = ({ productId }) => {
  const { profile } = useProfile();
  const queryClient = useQueryClient(); // Исправлено объявление queryClient
  const { mutate } = useMutation(
    ['toggle favorite'],
    () => UserService.toggleFavorite(productId),
    {
      onSuccess() {
        queryClient.invalidateQueries('get profile'); // Исправлен вызов invalidateQueries
      }
    }
  );

  if (!profile) return null;

  const isExists = profile?.favorites?.some(
    (favorite) => favorite.id === productId
  );
  
  const handleClick = async () => {
    await mutate(); // Добавлено ожидание промиса
  };

  return (
    <div>
      <button onClick={handleClick} className='text-dark'>
        {isExists ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
    </div>
  );
};

export default FavoriteButton;
