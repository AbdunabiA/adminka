import { Button, notification } from "antd";
import { Fields } from "components";
import { Field} from "formik";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "store/auth";
import storage from "services/storage";
import { ContainerForm } from "modules";

const index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-sky-400">
      <div className="w-1/2 shadow-md p-10 rounded-md bg-white">
        <ContainerForm
          url="/user/sign-in"
          method='post'
          params={{extra:{_l:'uz'}}}
          fields={[
            {
              name: "username",
              type:'string',
              requried:true,
            },
            {
              name: "password",
              type:'string',
              requried:true,
            },
            {
              name: "phone",
              type:'string',
              required:true,
            },
            {
              name:'status',
              type:'number',
              value:1
            }
          ]}
          onSuccess={(data)=>{
            // console.log('DATA',data.data)
            storage.set('token', get(data, 'data.token'))
            dispatch(signIn(get(data, 'data')))
            storage.set("userId", get(data, "data.user.id"));
            navigate("/");
          }}
          onError={()=>{
            notification.error({
              message:'Login or password incorrect'
            })
          }}
        >
          {({ values, handleSubmit }) => {
            return (
              <>
                <Field name="phone" label="Phone" component={Fields.Input} />
                <Field
                  name="username"
                  label="User name"
                  component={Fields.Input}
                  />

                <Field
                  name="password"
                  label="Password"
                  component={Fields.Input}
                  />
                <Button type="primary" onClick={handleSubmit}>
                  Submit
                </Button>
                <span onClick={() => navigate("/auth/registration")}>
                  Registration
                </span>
              </>
            );
          }}
        </ContainerForm>
      </div>
    </div>
  );
};

export default index;
