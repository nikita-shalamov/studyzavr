import { Select, SelectItem, Avatar } from "@nextui-org/react";
import useGetStudents from "@/hooks/useGetStudents";
import { useUserStore } from "@/store/useUserStore";

interface StudentSelectorProps {
  item: string | undefined;
  setItem: (newValue: string) => void;
  error?: boolean | null;
}

const StudentSelector = ({ item, setItem, error }: StudentSelectorProps) => {
  const user = useUserStore((state) => state.user);
  const { isLoading, students } = useGetStudents(user?.userId as string);

  return (
    <Select
      items={students || []}
      label="Ученик:"
      placeholder="Выбрать ученика"
      labelPlacement="outside"
      className="max-w-xs"
      onChange={(e) => {
        setItem(e.target.value);
      }}
      defaultSelectedKeys={[String(item)]}
      value={item}
      isLoading={isLoading}
      isDisabled={isLoading}
      disallowEmptySelection={true}
      isInvalid={error ? error : false}
      errorMessage={error ? "Выберите ученика" : false}
    >
      {(user) => (
        <SelectItem key={user.id} textValue={user.name}>
          <div className="flex gap-2 items-center">
            <Avatar
              alt={user.name}
              className="flex-shrink-0"
              size="sm"
              src={user.image || undefined}
            />
            <div className="flex flex-col">
              <span className="text-small">{user.name}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};

export default StudentSelector;
