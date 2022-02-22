import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {Observer} from 'mobx-react';

import {tasksStore} from '../store/tasks';
import {MyListText} from '../style/text';
import {ListSeparator} from '../style/separator';
import {Title, SubTitle} from '../style/text';
import {Container, RowContainer} from '../style/container';
import {MyInput} from '../style/input';
import {MyButton} from '../style/button';

const Home = ({navigation}) => {
  const [title, setTitle] = useState('');

  return (
    <Container>
      <Title>My Tasks</Title>
      <MyInput hint="Title" onChangeText={t => setTitle(t)} value={title} />
      <RowContainer>
        <MyButton
          title="Add"
          onPress={() => {
            if (title) {
              tasksStore.addTask({title});
              setTitle('');
            }
          }}
          marginRight={12}
        />
        <MyButton
          title="View Done List"
          onPress={() => navigation.navigate('Done List')}
        />
      </RowContainer>
      <SubTitle>On Long Press to Done</SubTitle>
      <Observer>
        {() => (
          <FlatList
            data={tasksStore.tasks.filter(t => !t.isDone)}
            keyExtractor={item => item.id}
            style={{width: '100%', marginTop: 20, paddingBottom: 10}}
            ItemSeparatorComponent={() => <ListSeparator />}
            renderItem={({item}) => (
              <MyListText
                content={`${item.title}`}
                onLongPress={() => tasksStore.setDoneTask(item.id)}
                description={`Create Date: ${item.createDate.toLocaleDateString('en-US')}`}
              />
            )}
          />
        )}
      </Observer>
    </Container>
  );
};

export default Home;
