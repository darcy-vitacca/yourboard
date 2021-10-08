export const friendsSelectListParse = (friends) =>
  friends
    ? friends.map((friend) => {
        return { label: friend.name, value: friends.email };
      })
    : [{ label: "", value: "" }];
