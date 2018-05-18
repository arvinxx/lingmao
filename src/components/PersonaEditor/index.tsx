import React, { Component, Fragment } from 'react';
import { TTag } from '../../models/tag';
import styles from './index.less';
import { connect } from 'dva';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DraggableBlock from './DraggableBlock';
import { TCluster, TClusterResult } from '../../models/data';
import { getFilterPersonaData } from '../../utils';

interface IPersonaEditorProps {
  personaData: TClusterResult;
  checkedDims: string[];

  dispatch?: Function;
}
@connect()
@(DragDropContext(HTML5Backend) as any)
export default class PersonaEditor extends Component<IPersonaEditorProps> {
  render() {
    const { personaData, dispatch, checkedDims } = this.props;
    const filterData = getFilterPersonaData(personaData, checkedDims);
    return (
      <Fragment>
        <div className={styles.container}>
          {filterData.map((cluster: TCluster, index) => (
            <DraggableBlock key={index} dispatch={dispatch} index={index}>
              {cluster.tagText}
              {cluster.value}
            </DraggableBlock>
          ))}
        </div>
      </Fragment>
    );
  }
}
