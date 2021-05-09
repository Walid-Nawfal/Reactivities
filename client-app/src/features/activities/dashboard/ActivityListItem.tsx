import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import ActivityListItemAttendee from './ActivityListItemAttendee';

interface Props {
    activity: Activity
}

export default function ActivityListItem({ activity }: Props) {

    const { userStore } = useStore();
    const { user } = userStore;
    const isHost = user?.username === activity.hostUsername;
    const [isGoing, setIsGoing] = useState(false);
    useEffect(() => {
        activity.attendees?.forEach(attendee => {
            if (attendee.username === user?.username) setIsGoing(true)
        });
    }, [activity.attendees, user?.username])
    return (
        <Segment.Group>
            <Segment>
                {activity.isCancelled &&
                    <Label attached='top' basic color='red' content='Cancelled' style={{ textAlign: 'center' }} />
                }
                <Item.Group>
                    <Item>
                        <Item.Image style={{marginBottom: 3}} size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Hosted by {activity.host?.displayName}</Item.Description>
                            {isHost && (
                                <Item.Description> <Label basic color='orange'>You are hosting this activity! </Label></Item.Description>
                            )}
                            {isGoing && !isHost && (
                                <Item.Description> <Label basic color='teal'>You are going to this activity! </Label></Item.Description>
                            )}

                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker' /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                <ActivityListItemAttendee attendees={activity.attendees!} />
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}