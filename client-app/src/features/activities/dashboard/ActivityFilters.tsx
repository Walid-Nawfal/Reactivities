import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

export default function ActivityFilters() {
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 25 ,position: 'sticky', top:'12vh', right:0}} >
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item content='All Activites' />
                <Menu.Item content="I'm going" />
                <Menu.Item content="I'm hosting" />
                <Menu.Item><Calendar /></Menu.Item>
            </Menu>
            <Header />
        </>
    )
}