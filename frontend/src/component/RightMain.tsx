import React from 'react';
import UserList from "./UserList/UserList";

export default function RightMain(props: any) {
    const {users, mainuser, friends} = props;
    return (
        <>
            <UserList users={friends} mainuser={mainuser} title="Friends"/>
            <UserList users={users} mainuser={mainuser} title="Users"/>
        </>
    );
}
