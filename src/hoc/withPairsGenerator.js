import React from 'react';
import {getUniqueByKey, shuffleArray} from '../helpers/utility';
import memoizeOne from 'memoize-one';

export default function withPairsGenerator(WrappedComponent) {
  return class WrapperWithPairsGenerator extends React.Component {
    getLocations = users => getUniqueByKey(users, 'location');
    getDepartment = users => getUniqueByKey(users, 'department');

    getPairs = array => {
      const [head] = array;
      const getPairsRecursion = array => {
        if (!array || array.length < 1) {
          return [];
        }
        if (array.length === 1) {
          const [giver] = array;
          return [
            {
              giver,
              receiver: head,
            },
          ];
        }
        const [giver, receiver, ...others] = array;
        return [
          {
            giver,
            receiver,
          },
          ...getPairsRecursion([receiver, ...others]),
        ];
      };
      return getPairsRecursion(array);
    };

    // For each combination of location and department,
    // execute the given function
    combineLocationsDepartments = (users, fn) => {
      const locations = this.getLocations(users);
      const departments = this.getDepartment(users);

      return locations.reduce((acc, location) => {
        const departmentsReduced = departments.reduce((depAcc, department) => {
          return [
            ...depAcc,
            ...fn({
              location,
              department,
            }),
          ];
        }, []);
        return [...acc, ...departmentsReduced];
      }, []);
    };

    // shuffle the people and create the chain of pairs
    // and return an array of pairs
    getPairsFromLocationDepartment = users => ({location, department}) => {
      const list = users.filter(
        u => u.location === location && u.department === department,
      );
      const shuffledList = shuffleArray(list);
      return this.getPairs(shuffledList);
    };

    generatePairs = users => {
      return this.combineLocationsDepartments(
        users,
        this.getPairsFromLocationDepartment(users),
      );
    };

    render() {
      return (
        <WrappedComponent
          generatePairs={memoizeOne(this.generatePairs)}
          combineLocationsDepartments={this.combineLocationsDepartments}
          {...this.props}
        />
      );
    }
  };
}
