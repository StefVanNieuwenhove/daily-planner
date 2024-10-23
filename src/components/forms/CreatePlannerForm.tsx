import { Control, Path } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const CreatePlannerForm = () => {
  return (
    <>
      <FormField
        name='name'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Planners name</FormLabel>
            <FormControl>
              <Input
                {...field}
                type='text'
                name='name'
                placeholder='Planner 1'
                autoFocus
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default CreatePlannerForm;
