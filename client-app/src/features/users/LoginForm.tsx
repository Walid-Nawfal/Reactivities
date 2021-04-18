import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";

export interface functionProps {
    
}
 
const LoginForm = () => {
    const {userStore} = useStore();
    return ( 
        <Formik
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => 
                setErrors({error: 'Invalid email or password'}))}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <Header content='Login to Reactivities' as='h2' color='teal' textAlign='center' />
                    <MyTextInput name='email' type='email' placeholder='Email' />
                    <MyTextInput name='password' type='password' placeholder='Password' />
                    <ErrorMessage
                        name='error'
                        render={() => <Label style={{marginBottom: 10}} basic color='red' content={errors.error} />}
                    />
                    <Button loading={isSubmitting} primary content='Login' type='submit' fluid />
                </Form>
            )}
        </Formik>
    );
}
 
export default observer(LoginForm);