import { Switch } from '@/components/ui/switch';

function CustomSwitch(props: React.ComponentProps<typeof Switch>) {
  return (
    <Switch
      {...props}
      className="w-9 h-6 data-[state=checked]:bg-[#022A9A] data-[state=unchecked]:bg-[#606882] [&>span]:data-[state=unchecked]:translate-x-[2px]"
    />
  );
}

export { CustomSwitch };
