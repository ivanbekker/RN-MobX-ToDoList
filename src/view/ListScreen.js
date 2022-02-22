import React from 'react';
import {observer} from 'mobx-react';

import {MyListText, SubTitle} from '../style/text';
import {Container} from '../style/container';
import {FlatList} from 'react-native';
import {ListSeparator} from '../style/separator';
import {tasksStore} from '../store/tasks';

const ListScreen = observer(() => {
  return (
    <Container>
      <SubTitle>On Long Press to Delete</SubTitle>
      <FlatList
        data={tasksStore.tasks.filter(t => t.isDone)}
        keyExtractor={item => item.id}
        style={{width: '100%', marginTop: 20, paddingBottom: 10}}
        ItemSeparatorComponent={() => <ListSeparator />}
        renderItem={({item}) => (
          <MyListText
            content={`${item.title}`}
            onLongPress={() => tasksStore.deleteTask(item.id)}
            description={`Create Date: ${item.createDate.toLocaleDateString('en-US')}`}
          />
        )}
      />
    </Container>
  );
});

export default ListScreen;
