//=====================[GENERAL COMPONENTS START]=====================//
import {Wrapper} from "./general/Wrapper/Wrapper.tsx";
import {ProtectedRoute} from "./general/ProtectedRoute/ProtectedRoute.tsx";
import {Sidebar} from "./general/Sidebar/Sidebar.tsx";
import {Footer} from "./general/Footer/Footer.tsx";
//=====================[GENERAL COMPONENTS END]=====================//



//=====================[FORMS COMPONENTS START]=====================//
import {SignInForm} from "./forms/SignInForm/SignInForm.tsx";
import {SignUpForm} from "./forms/SignUpForm/SignUpForm.tsx";
import {ForgotPasswordForm} from "./forms/ForgotPasswordForm/ForgotPasswordForm.tsx";
//=====================[FORMS COMPONENTS END]=====================//



//=====================[MODALS COMPONENTS START]=====================//
import {CreatePostModal} from "./modals/CreatePostModal/CreatePostModal.tsx";
import {PostModal} from "./modals/PostModal/PostModal.tsx";
import {EditPostModal} from "./modals/EditPostModal/EditPostModal.tsx";
//=====================[MODALS COMPONENTS END]=====================//



//=====================[CARDS COMPONENTS START]=====================//
import {PostCard} from "./cards/PostCard/PostCard.tsx";
import {PostCardInProfile} from "./cards/PostCardInProfile/PostCardInProfile.tsx";
import {InterlocutorCard} from "./cards/InterlocutorCard/InterlocutorCard.tsx";
import {CommentCard} from "./cards/CommentCard/CommentCard.tsx";
//=====================[CARDS COMPONENTS END]=====================//



//=====================[INPUTS COMPONENTS START]=====================//
import {Slider} from "./inputs/Slider/Slider.tsx";
import {ThemeSwitcher} from "./inputs/ThemeSwitcher/ThemeSwitcher.tsx";
import {CustomButton} from "./inputs/CustomButton/CustomButton.tsx";
import {CustomInput} from "./inputs/CustomInput/CustomInput.tsx";
//=====================[INPUTS COMPONENTS END]=====================//



//=====================[OTHER COMPONENTS START]=====================//
import {Separator} from "./other/Separator/Separator.tsx";
import {AvatarCircle} from "./other/AvatarCircle/AvatarCircle.tsx";
import {SimpleAvatarCircle} from "./other/SimpleAvatarCircle/SimpleAvatarCircle.tsx";
import {Phone} from "./other/Phone/Phone.tsx";
import {ExpandableText} from "./other/ExpandableText/ExpandableText.tsx";
import {Loader} from "./other/Loader/Loader.tsx";
import {ProfileHeader} from "./other/ProfileHeader/ProfileHeader.tsx";
import {CommentsList} from "./other/CommentsList/CommentsList.tsx";
//=====================[OTHER COMPONENTS END]=====================//



export {
    Wrapper,
    ProtectedRoute,
    Sidebar,
    Footer,

    SignInForm,
    SignUpForm,
    ForgotPasswordForm,

    CreatePostModal,
    EditPostModal,
    PostModal,

    CustomButton,
    CustomInput,
    Slider,
    Separator,


    PostCard,
    PostCardInProfile,
    InterlocutorCard,
    CommentCard,

    ThemeSwitcher,
    AvatarCircle,
    SimpleAvatarCircle,

    Phone,
    ExpandableText,
    ProfileHeader,
    CommentsList,
    Loader};