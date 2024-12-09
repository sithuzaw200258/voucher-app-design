import { lazy } from "react";
const ChangePasswordPage = lazy(() => import("../features/user-profile/Pages/ChangePasswordPage"));
const ChangeNamePage = lazy(() => import("../features/user-profile/Pages/ChangeNamePage"));
const UserProfilePage = lazy(() => import("../features/user-profile/Pages/UserProfilePage"));

const userProfileRoute = [
    {
        path: 'user-profile',
        children: [
            {
                index: true,
                element: <UserProfilePage />
            },
            {
                path: 'change-password',
                element: <ChangePasswordPage />
            },
            {
                path: 'change-name',
                element: <ChangeNamePage />
            }
        ]
    },
]

export default userProfileRoute