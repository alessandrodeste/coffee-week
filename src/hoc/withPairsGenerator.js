import React from 'react';

export default function withPairsGenerator(WrappedComponent) {
    return class extends React.Component {
        shuffle = (a) => {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        getUniqueByKey = (array, key) => [...new Set(array.map(item => item[key]))];
        getListOfLocations = (users) => this.getUniqueByKey(users, 'location');
        getListOfDepartment = (users) => this.getUniqueByKey(users, 'department');

        getPairs = (array) => {
            const [head] = array;
            const getPairsRecursion = (array) => {
                if (!array || array.length < 1) {
                    return [];
                }
                if (array.length === 1) {
                    const [giver] = array;
                    return [{
                        giver,
                        receiver: head
                    }]
                }
                const [giver, receiver, ...others] = array;
                return [
                    {
                        giver,
                        receiver
                    },
                    ...getPairsRecursion([receiver, ...others])
                ];
            }
            return getPairsRecursion(array);
        }

        generatePairs = (users) => {
            const locations = this.getListOfLocations(users);
            const departments = this.getListOfDepartment(users);
            
            // For each combination of location and department, 
            // shuffle the people and create the chain of pairs
            return locations.reduce((acc, location) => {
                const departmentsShuffled = departments.reduce((depAcc, department) => {
                    const list = users.filter(u => u.location === location && u.department === department);
                    const shuffledList = this.shuffle(list);
                    const pairs = this.getPairs(shuffledList);
                    return [...depAcc, ...pairs];
                }, []);                
                return [...acc, ...departmentsShuffled];
            }, []);
        };

        render() {
            return <WrappedComponent
                generatePairs={this.generatePairs}
                {...this.props}
            />;
        }
    };
};

