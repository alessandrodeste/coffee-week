import React from 'react';
import {getUniqueByKey} from '../helpers/utility';

export default function withPairsGenerator(WrappedComponent) {
  return class WrapperWithPairsGenerator extends React.Component {
    shuffle = a => {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

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

    combineLocationsDepartments = (users, fn) => {
      const locations = this.getLocations(users);
      const departments = this.getDepartment(users);

      // For each combination of location and department,
      // shuffle the people and create the chain of pairs
      return locations.reduce((acc, location) => {
        const departmentsShuffled = departments.reduce((depAcc, department) => {
          return [
            ...depAcc,
            ...fn({
              location,
              department,
            }),
          ];
        }, []);
        return [...acc, ...departmentsShuffled];
      }, []);
    };

    getPairsFromLocationDepartment = users => ({location, department}) => {
      const list = users.filter(
        u => u.location === location && u.department === department,
      );
      const shuffledList = this.shuffle(list);
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
          generatePairs={this.generatePairs}
          combineLocationsDepartments={this.combineLocationsDepartments}
          {...this.props}
        />
      );
    }
  };
}
