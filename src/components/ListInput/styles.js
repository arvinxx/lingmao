import styled from 'styled-components';

/**
 * 控制左侧缩进与边框颜色
 * @param  indent 缩进数值
 */
export const Container = styled.div`
  margin-left: ${props => props.indent}px;
  padding-left: ${props => props.indent}px;
  border-left: ${props => (props.root ? '0' : '1px solid #edeff1')};
  border-color: ${props => (props.focusId === props.id ? '#ced1d7' : '#edeff1')};
  transition: all 0.2s;
`;

/**
 * 控制小圆点的尺寸，与 indent 值直接挂钩
 * @param  indent 缩进距离
 */
export const CircleContainer = styled.div`
  width: ${props => props.indent * 2} px;
  height: ${props => props.indent * 2} px;
  border-radius: ${props => props.indent * 2} px;
  border: 6px solid transparent;
  cursor: pointer;
  transition: border 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
`;
