import { useQuery } from "@tanstack/react-query";
import { Flex, Input, Spin, Typography, Card } from "antd";
import { useState } from "react";
import type { IUserInfo } from "../../../types/IUserState";
import CardLoader from "../CardLoader";

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

  const { data: users, isLoading } = useQuery({
    queryKey: [...queryKey, searchValue],
    queryFn: () => handleSearch(searchValue),
  });

  if (isLoading) return <CardLoader />;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search users..."
        allowClear
        autoFocus
      />

      {/* Results Dropdown Container */}
      {users.length > 0 && (
        <Card size="small" className="ResultDropDownContainer">
          {isLoading ? (
            <Flex justify="center" align="center" style={{ padding: 20 }}>
              <Spin size="small" />
            </Flex>
          ) : users && users.length > 0 ? (
            users.map((user: IUserInfo) => (
              <Flex
                key={user.userId}
                vertical
                onClick={() => handleSelect(user)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f5f5f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <Text strong style={{ fontSize: 13 }}>
                  {user.name}
                </Text>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {user.email}
                </Text>
              </Flex>
            ))
          ) : (
            <div style={{ padding: "12px", textAlign: "center" }}>
              <Text type="secondary">No users found</Text>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default SearchAndSelect;
