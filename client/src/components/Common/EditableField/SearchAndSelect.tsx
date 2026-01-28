import { useQuery } from "@tanstack/react-query";
import { Flex, Input, Typography, Card } from "antd";
import { useState } from "react";
import type { IUserInfo } from "../../../types/IUserState";
import CardLoader from "../CardLoader";
import "./SearchAndSelect.css";

const { Text } = Typography;

type SearchAndSelectProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSearch: (value: string) => Promise<any>;
  handleSelect: (user: IUserInfo) => void;
  queryKey: string[];
};

const SearchAndSelect = ({
  handleSearch,
  handleSelect,
  queryKey,
}: SearchAndSelectProps) => {
  const [searchValue, setSearchValue] = useState("");

  const { data: users = [], isLoading } = useQuery({
    queryKey: [...queryKey, searchValue],
    queryFn: () => handleSearch(searchValue),
  });

  return (
    <div className="SearchAndSelectContainer">
      {isLoading && <CardLoader />}
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search users..."
        allowClear
        autoFocus
        style={{ width: "100%" }}
      />

      {/* Results Dropdown */}
      {users.length > 0 && (
        <Card size="small" className="ResultDropDownContainer">
          {users.map((user: IUserInfo) => (
            <Flex
              key={user.userId}
              vertical
              className="user-item"
              onClick={() => handleSelect(user)}
            >
              <Text className="user-name">{user.name}</Text>
              <Text className="user-email">{user.email}</Text>
            </Flex>
          ))}
        </Card>
      )}

      {/* No users found */}
      {!isLoading && users.length === 0 && searchValue && (
        <Card size="small" className="ResultDropDownContainer no-users">
          <Text type="secondary">No users found</Text>
        </Card>
      )}
    </div>
  );
};

export default SearchAndSelect;
